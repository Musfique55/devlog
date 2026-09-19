import status from "http-status";
import { io } from "../app";
import AppError from "../helper/AppError";
import { workspaceService } from "../module/workspace/workspace.services";
import { envVars } from "../config/env";
import { jwtUtils } from "../utils/jwt";
import { prisma } from "../../lib/prisma";
import { IRequestUser } from "../middleware/checkAuth";

io.on("connection", async (socket) => {
  const userId = (socket as any).user.id;
  socket.join(`user:${userId}`);

  const workspaceIds = await workspaceService.getWorkSpacesByUserId(userId);
  workspaceIds.data.forEach((workspace) => {
    socket.join(`workspace:${workspace.id}`);
  });
});

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    next(new AppError("Unauthorized", status.UNAUTHORIZED));
  }
  const decodeToken = jwtUtils.verifyToken(token, envVars.JWT_SECRET);
  if (!decodeToken.success) {
    next(new AppError("Unauthorized", status.UNAUTHORIZED));
  }
  const user = await prisma.user.findUnique({
    where: {
      id: (decodeToken.data as IRequestUser).id,
    },
  });

  if (!user) {
    next(new AppError("Unauthorized", status.UNAUTHORIZED));
  }

  (socket as any).user = user;
  next();
});
