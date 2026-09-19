/*
  Warnings:

  - The values [WORKSPACE_INVITE,WORKSPACE_MEMBER_ADDED,WORKSPACE_MEMBER_REMOVED,WORKSPACE_MEMBER_ROLE_CHANGED,WORKSPACE_DELETED,WORKSPACE_RESTORED,WORKSPACE_UPDATED] on the enum `notificationType` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "notificationType_new" AS ENUM ('ANNOUNCEMENT', 'BLOCKER_UPDATED', 'SUBSCRIPTION_PAYMENT_SUCCESS', 'SUBSCRIPTION_PAYMENT_FAILED', 'SUBSCRIPTION_EXPIRED', 'WELCOME');
ALTER TABLE "notification" ALTER COLUMN "type" TYPE "notificationType_new" USING ("type"::text::"notificationType_new");
ALTER TYPE "notificationType" RENAME TO "notificationType_old";
ALTER TYPE "notificationType_new" RENAME TO "notificationType";
DROP TYPE "public"."notificationType_old";
COMMIT;
