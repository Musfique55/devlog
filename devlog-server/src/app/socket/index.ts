import status from "http-status";
import { initSocket } from "../utils/socket";
import AppError from "../helper/AppError";
import { workspaceService } from "../module/workspace/workspace.services";
import { envVars } from "../config/env";
import { jwtUtils } from "../utils/jwt";
import { prisma } from "../../lib/prisma";
import { server } from "../app";

const io = initSocket(server, {
  origin: [envVars.FRONTEND_URL || "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

io.use(async (socket, next) => {
  const token = socket.handshake.auth.token;
  if (!token) {
    next(new AppError("Unauthorized", status.UNAUTHORIZED));
  }
  const bearerToken = token.split(" ")[1];

  const decodeToken = jwtUtils.verifyToken(bearerToken, envVars.JWT_SECRET);
  if (!decodeToken.success) {
    next(new AppError("Unauthorized", status.UNAUTHORIZED));
  }

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: (decodeToken?.data as any)?.userId,
      },
    });

    if (!user) {
      next(new AppError("Unauthorized", status.UNAUTHORIZED));
    }

    (socket as any).user = user;
    next();
  } catch (error: any) {
    next(new AppError(error.message, error.statusCode));
  }
});

io.on("connection", async (socket) => {
  const userId = (socket as any).user.id;
  if (!userId) {
    return;
  }
  socket.join(userId);

  const workspaceIds = await workspaceService.getWorkSpacesByUserId(userId);
  workspaceIds.data.forEach((workspace) => {
    if (!workspace.id) {
      return;
    }
    socket.join(workspace.id);
  });
});
