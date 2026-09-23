-- AlterEnum
-- This migration adds more than one value to an enum.
-- With PostgreSQL versions 11 and earlier, this is not possible
-- in a single migration. This can be worked around by creating
-- multiple migrations, each migration adding only one value to
-- the enum.


ALTER TYPE "notificationType" ADD VALUE 'SUBSCRIPTION_PAYMENT_SUCCESS';
ALTER TYPE "notificationType" ADD VALUE 'SUBSCRIPTION_PAYMENT_FAILED';
ALTER TYPE "notificationType" ADD VALUE 'SUBSCRIPTION_EXPIRED';

-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_workspaceId_fkey";

-- AlterTable
ALTER TABLE "notification" ALTER COLUMN "workspaceId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_workspaceId_fkey" FOREIGN KEY ("workspaceId") REFERENCES "workspace"("id") ON DELETE SET NULL ON UPDATE CASCADE;
