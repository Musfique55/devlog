-- DropForeignKey
ALTER TABLE "notification" DROP CONSTRAINT "notification_recipientId_fkey";

-- AlterTable
ALTER TABLE "notification" ALTER COLUMN "recipientId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "notification" ADD CONSTRAINT "notification_recipientId_fkey" FOREIGN KEY ("recipientId") REFERENCES "user"("id") ON DELETE SET NULL ON UPDATE CASCADE;
