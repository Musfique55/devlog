import { prisma } from "../../../lib/prisma";
import redis from "../../config/redis";
import AppError from "../../helper/AppError";
import { IRequestUser } from "../../middleware/checkAuth";
import { getIo } from "../../utils/socket";
import { CreateNotificationDTO } from "./notification.schema";

const createNotification = async (data: CreateNotificationDTO) => {
  const payload = {
    ...data,
    workspaceId: data.workspaceId ?? null,
    actorId: data.actorId ?? null,
    recipientId: data.recipientId ?? null,
  };

  try {
    const notification = await prisma.notification.create({
      data: payload,
    });
    let key = null;
    if (data.workspaceId) {
      key = `workspace:notifications:${data.workspaceId}`;
    } else {
      key = `notifications:${data.recipientId}`;
    }
    if (key) {
      await redis.lpush(key, JSON.stringify(notification));
      await redis.ltrim(key, 0, 49);
    }

    const io = getIo();

    if (data.workspaceId) {
      io.to(data.workspaceId).emit("notification", notification);
    } else {
      io.to(data.recipientId!).emit("notification", notification);
    }

    return notification;
  } catch (error) {
    console.error("Error creating notification:", error);
    throw error;
  }
};

const getNotifications = async (user: IRequestUser) => {
  try {
    // pipelining query for multiple keys
    const pipeline = redis.pipeline();
    const p_key = `notifications:${user.id}`;
    const workspaceIds = await redis.smembers(`notifications:${user.id}:workspace`);
    for (const id of workspaceIds) {
      pipeline.lrange(`workspace:notifications:${id}`, 0, 19);
    }
    pipeline.lrange(p_key, 0, 19);

    const cachedNotifications = await pipeline.exec();
    // pipeline finished

    const allCachedNotifications = cachedNotifications?.flatMap(([err,result]) => {
      if(err || !result) return [];
      return (result as string []).map((n) => JSON.parse(n));
    }).sort((a,b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());

    if(allCachedNotifications?.length){
      return allCachedNotifications;
    }
    
    const notifications = await prisma.notification.findMany({
      where: {
        OR: [
          {
            recipientId : user.id,
          },
          {
            workspace: {
              members: {
                some: {
                  userId: user.id,
                },
              },
            },
          },
        ],
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    for(const notification of notifications){
      await redis.lpush(p_key, JSON.stringify(notification));
    }
    
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

const markAsRead = async (id: string) => {
  try {
    const isExist = await prisma.notification.findUnique({
      where: {
        id,
      },
    });
    if (!isExist) {
      throw new AppError("invalid id", 400);
    }
    const notification = await prisma.notification.update({
      where: {
        id,
      },
      data: {
        read: true,
      },
    });

    // update redis
    const key = notification.workspaceId
      ? `workspace_notifications:${notification.workspaceId}`
      : `notifications:${notification.recipientId}`;

    const cachedNotification = await redis.lrange(key, 0, 49);
    if (cachedNotification) {
      const notifications = cachedNotification.map((n: string) =>
        JSON.parse(n),
      );
      const updatedNotifications = notifications.map((n: any) =>
        n.id === id ? notification : n,
      );
      await redis.lpush(key, JSON.stringify(updatedNotifications));
    }
    return notification;
  } catch (error) {
    console.error("Error updating notification:", error);
    throw error;
  }
};

export const notificationService = {
  createNotification,
  getNotifications,
  markAsRead,
};
