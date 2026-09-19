import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { notificationService } from "./notification.services";

const getNotificationsByUserId = catchAsync(
  async (req: Request, res: Response) => {
    const userId = req.params.userId as string;
    const notifications =
      await notificationService.getNotificationsByUserId(userId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Notifications fetched successfully",
      data: notifications,
    });
  },
);

const getWorkspaceNotifications = catchAsync(
  async (req: Request, res: Response) => {
    const workspaceId = req.params.workspaceId as string;
    const notifications =
      await notificationService.getWorkspaceNotifications(workspaceId);
    sendResponse(res, {
      statusCode: 200,
      success: true,
      message: "Notifications fetched successfully",
      data: notifications,
    });
  },
);

const markAsRead = catchAsync(async (req: Request, res: Response) => {
  const id = req.params.id as string;
  const notification = await notificationService.markAsRead(id);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notification marked as read successfully",
    data: notification,
  });
});

export const notificationController = {
  getNotificationsByUserId,
  getWorkspaceNotifications,
  markAsRead,
};
