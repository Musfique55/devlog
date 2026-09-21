import { Request, Response } from "express";
import { catchAsync } from "../../shared/catchAsync";
import { sendResponse } from "../../shared/sendResponse";
import { notificationService } from "./notification.services";
import { IRequestUser } from "../../middleware/checkAuth";

const getNotifications = catchAsync(async (req: Request, res: Response) => {
  const notifications = await notificationService.getNotifications(req.user as IRequestUser);
  sendResponse(res, {
    statusCode: 200,
    success: true,
    message: "Notifications fetched successfully",
    data: notifications,
  });
});

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
  getNotifications,
  markAsRead,
};
