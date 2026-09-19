import express from "express";
import http from "http";
import cors from "cors";
import dotenv from "dotenv";
import { toNodeHandler } from "better-auth/node";
import { auth } from "../lib/auth";
import { indexRoutes } from "./routes/router";
import cookieParser from "cookie-parser";
import { globalErrorHandler } from "./middleware/globalErrorHandler";
import { notFound } from "./middleware/notFound";
import cron from "node-cron";
import { inviteServices } from "./module/invite/invite.services";
import path from "path";
import { fileURLToPath } from "url";
import YAML from "yamljs";
import swagger from "swagger-ui-express";

import { paymentController } from "./module/payment/payment.controller";
import { envVars } from "./config/env";
import { initSocket } from "./utils/socket";

dotenv.config();

const currentDirectory = path.dirname(fileURLToPath(import.meta.url));
const swaggerDocument = YAML.load(
  path.join(currentDirectory, "docs", "swagger.yaml"),
);

const app = express();
const server = http.createServer(app);

export const io = initSocket(server, {
  origin: [envVars.FRONTEND_URL || "http://localhost:3000"],
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
});

app.post(
  "/webhook",
  express.raw({ type: "application/json" }),
  paymentController.handleStripeWebhook,
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

app.set("view engine", "ejs");

app.use(
  cors({
    origin: [envVars.FRONTEND_URL || "http://localhost:3000"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use("/api/docs", swagger.serve, swagger.setup(swaggerDocument));

app.use("/api/auth", toNodeHandler(auth));

cron.schedule("0 0 * * *", async () => {
  await inviteServices.updateExpiredTokens();
});


app.get("/health", async (req, res) => {
  res.status(200).json({
    message: "ok",
    success: true,
  });
});


app.use("/api/v1", indexRoutes);

app.use(globalErrorHandler);
app.use(notFound);

export { app, server };
export default app;
