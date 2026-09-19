/*
  Warnings:

  - Changed the type of `type` on the `notification` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "notificationType" AS ENUM ('WORKSPACE_INVITE', 'WORKSPACE_MEMBER_ADDED', 'WORKSPACE_MEMBER_REMOVED', 'WORKSPACE_MEMBER_ROLE_CHANGED', 'WORKSPACE_DELETED', 'WORKSPACE_RESTORED', 'WORKSPACE_UPDATED');

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "type",
ADD COLUMN     "type" "notificationType" NOT NULL;
