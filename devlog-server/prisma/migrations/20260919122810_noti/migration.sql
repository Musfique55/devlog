/*
  Warnings:

  - You are about to drop the column `userId` on the `notification` table. All the data in the column will be lost.
  - Added the required column `recipientId` to the `notification` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_userId_fkey";

-- DropIndex
DROP INDEX "notification_userId_workspaceId_idx";

-- AlterTable
ALTER TABLE "notification" DROP COLUMN "userId",
ADD COLUMN     "actorId" TEXT,
ADD COLUMN     "recipientId" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "notification_recipientId_workspaceId_idx" ON "notification"("recipientId", "workspaceId");

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
