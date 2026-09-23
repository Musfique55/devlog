import { Router } from "express";
import { authRoutes } from "../module/auth/auth.routes";
import { workspaceRoutes } from "../module/workspace/workspace.routes";
import { standupLogRoutes } from "../module/standupLogs/standupLogs.routes";
import { inviteRoutes } from "../module/invite/invite.routes";
import { dashboardRoutes } from "../module/dashboard/dashboard.routes";
import { checkoutRoutes } from "../module/checkout/checkout.routes";
import { adminRoutes } from "../module/admin/admin.routes";
import { userRoutes } from "../module/users/user.routes";
import { notificationRoutes } from "../module/notification/notifications.route";

const router = Router();

router.use("/auth", authRoutes);
router.use("/workspaces", workspaceRoutes);
router.use("/logs", standupLogRoutes);
router.use("/invites", inviteRoutes);
router.use("/dashboard", dashboardRoutes);
router.use("/payments", checkoutRoutes);
router.use("/users", userRoutes);
router.use("/notifications", notificationRoutes);

// admin
router.use("/admin", adminRoutes);

export const indexRoutes = router;
