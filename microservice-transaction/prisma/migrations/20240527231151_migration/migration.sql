/*
  Warnings:

  - The `status` column on the `transactions` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "transactions" DROP COLUMN "status",
ADD COLUMN     "status" TEXT NOT NULL DEFAULT 'pending';

-- DropEnum
DROP TYPE "TransactionStatus";
