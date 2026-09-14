import { createEnv } from "@t3-oss/env-nextjs";
import * as z from "zod";

export const envVars = createEnv({
  server: {
    API_URL: z.string(),
    AUTH_URL: z.string(),
    BACKEND_URL: z.string(),
    FRONTEND_URL: z.string(),
    BETTER_AUTH_SECRET: z.string(),
    JWT_SECRET_KEY: z.string(),
    STRIPE_SECRET_KEY: z.string(),
  },
  runtimeEnv: {
    API_URL: process.env.API_URL,
    AUTH_URL: process.env.AUTH_URL,
    BACKEND_URL: process.env.BACKEND_URL,
    FRONTEND_URL: process.env.FRONTEND_URL,
    BETTER_AUTH_SECRET: process.env.BETTER_AUTH_SECRET,
    JWT_SECRET_KEY: process.env.JWT_SECRET_KEY,
    STRIPE_SECRET_KEY: process.env.STRIPE_SECRET_KEY,
  },
});
