import { prisma } from "../../../lib/prisma";
import redis from "../../config/redis";
import AppError from "../../helper/AppError";
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
      key = `workspace_notifications:${data.workspaceId}`;
    } else if (notification.recipientId) {
      key = `notifications:${notification.recipientId}`;
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

const getNotificationsByUserId = async (recipientId: string) => {
  try {
    const key = `notifications:${recipientId}`;
    const cachedNotification = await redis.lrange(key, 0, 49);
    if (cachedNotification) {
      const notifications = cachedNotification.map((n: string) =>
        JSON.parse(n),
      );
      return notifications;
    }
    const notifications = await prisma.notification.findMany({
      where: {
        recipientId,
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    await redis.lpush(key, JSON.stringify(notifications));
    return notifications;
  } catch (error) {
    console.error("Error fetching notifications:", error);
    throw error;
  }
};

const getWorkspaceNotifications = async (workspaceId: string) => {
  try {
    const key = `workspace_notifications:${workspaceId}`;
    const cachedNotification = await redis.lrange(key, 0, 49);
    if (cachedNotification) {
      const notifications = cachedNotification.map((n: string) =>
        JSON.parse(n),
      );
      return notifications;
    }
    const notifications = await prisma.notification.findMany({
      where: {
        workspaceId,
      },
      take: 10,
      orderBy: {
        createdAt: "desc",
      },
    });

    await redis.lpush(key, JSON.stringify(notifications));
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
  getNotificationsByUserId,
  getWorkspaceNotifications,
  markAsRead,
};
