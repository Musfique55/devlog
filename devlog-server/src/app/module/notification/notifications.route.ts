import { Router } from "express";
import { notificationController } from "./notification.controller";
import { APP_ROLE } from "../../../generated/prisma/enums";
import { checkAuth } from "../../middleware/checkAuth";

const router = Router();

router.get(
  "/",
  checkAuth(APP_ROLE.USER),
  notificationController.getNotifications,
);
// router.patch("/:id", checkAuth(APP_ROLE.USER), notificationController.updateNotification);
// router.delete("/:id", checkAuth(APP_ROLE.USER), notificationController.deleteNotification);

export const notificationRoutes = router;
