import status from "http-status";
import { prisma } from "../../../lib/prisma";
import AppError from "../../helper/AppError";
import { envVars } from "../../config/env";
import { WorkspaceMember,InviteStatus, PLAN } from "../../../generated/prisma/client";
import { sendEmail } from "../../utils/sendEmail";
import redis from "../../config/redis";

interface AcceptInviteResult {
  redirect: string | null;
  data?: WorkspaceMember;
}

const acceptInvite = async (token: string): Promise<AcceptInviteResult> => {
  try {
    const invite = await prisma.invite.findUnique({
      where: {
        token,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!invite) {
      throw new AppError("invalid invite link", status.NOT_FOUND);
    }

    if (invite.status !== InviteStatus.PENDING) {
      throw new AppError("invite link is not valid", status.BAD_REQUEST);
    }

    const user = await prisma.user.findUnique({
      where: {
        email: invite.email,
      },
    });

    if (!user) {
      return { redirect: `${envVars.FRONTEND_URL}/register?token=${token}` };
    }

    const result = await prisma.$transaction(async (tx) => {
      const member = await tx.workspaceMember.create({
        data: {
          userId: user.id,
          workspaceId: invite.workspaceId,
        },
      });
      await tx.invite.update({
        where: {
          token,
        },
        data: {
          status: InviteStatus.ACCEPTED,
        },
      });

      return member;
    });

    await redis.sadd(`notifications:${result.userId}:workspace`,result.workspaceId);
    return { redirect: null, data: result };
  } catch (error) {
    throw error;
  }
};

const EXPIRY_REMINDER_INTERVAL_MS = 30 * 24 * 60 * 60 * 1000; // 30 days

const updateExpiredTokens = async () => {
  const now = new Date();

  // mark expired pending invites
  await prisma.invite.updateMany({
    where: {
      expiresAt: {
        lt: now,
      },
      status: InviteStatus.PENDING,
    },
    data: {
      status: InviteStatus.EXPIRED,
    },
  });

  // expired pro users who are due for a monthly expiry reminder
  const expiredUsers = await prisma.user.findMany({
    where: {
      plan: PLAN.PRO,
      isDeleted: false,
      expiresAt: {
        lt: now,
      },
      OR: [
        { lastExpiryReminderAt: null },
        {
          lastExpiryReminderAt: {
            lt: new Date(now.getTime() - EXPIRY_REMINDER_INTERVAL_MS),
          },
        },
      ],
    },
    select: {
      id: true,
      name: true,
      email: true,
    },
  });

  if (expiredUsers.length === 0) {
    return;
  }

  for (const user of expiredUsers) {
    await sendEmail({
      subject: "Subscription Expired",
      templateData: {
        name: user.name,
        upgradeUrl: `${envVars.FRONTEND_URL}/upgrade-plan`,
      },
      templateName: "subscription-expired",
      to: user.email,
    });
  }

  // stamp so the next reminder only goes out after the 30-day interval
  await prisma.user.updateMany({
    where: {
      id: {
        in: expiredUsers.map((user) => user.id),
      },
    },
    data: {
      lastExpiryReminderAt: now,
    },
  });
};

export const inviteServices = {
  acceptInvite,
  updateExpiredTokens,
};
