import z from "zod";
import { notificationType } from "../../../generated/prisma/client";

export const createNotificationDTO = z
  .object({
    workspaceId: z.string().nullable().optional(),
    message: z.string().min(1, "Message is required"),
    type: z.enum(notificationType),
    recipientId: z.string(),
    actorId: z.string().nullable().optional(),
  })
  .superRefine((data, ctx) => {
    if (
      data.type === notificationType.ANNOUNCEMENT
    ) {
      if (!data.workspaceId) {
        ctx.addIssue({
          code: "custom",
          message:
            "Workspace ID is required for announcement and blocker updated notifications",
          path: ["workspaceId"],
        });
      }
    }
  });

export type CreateNotificationDTO = z.infer<typeof createNotificationDTO>;
