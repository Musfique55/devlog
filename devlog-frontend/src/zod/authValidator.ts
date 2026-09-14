import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(4, "Full name is required"),
  email: z.email("Invalid email address"),
  password: z.string().min(8, "minimum 8 characters required"),
  // .regex(
  //   /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
  //   {
  //     message:
  //       "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number and one special character",
  //   },
  // ),
  inviteToken: z.string().optional(),
});

const loginSchema = z.object({
  email: z.email("Invalid email address"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long required"),
});

export const authValidator = {
  register: registerSchema,
  login: loginSchema,
};
