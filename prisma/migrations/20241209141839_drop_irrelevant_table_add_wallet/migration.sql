/*
  Warnings:

  - You are about to drop the column `balance` on the `user` table. All the data in the column will be lost.
  - You are about to drop the column `linkedAt` on the `wallet` table. All the data in the column will be lost.
  - You are about to drop the `TokenPool` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Transaction` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `verification` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `lastActive` to the `wallet` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Transaction" DROP CONSTRAINT "Transaction_userId_fkey";

-- AlterTable
ALTER TABLE "user" DROP COLUMN "balance",
ALTER COLUMN "creditScore" DROP DEFAULT;

-- AlterTable
ALTER TABLE "wallet" DROP COLUMN "linkedAt",
ADD COLUMN     "connectedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isConnected" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastActive" TIMESTAMP(3) NOT NULL;

-- DropTable
DROP TABLE "TokenPool";

-- DropTable
DROP TABLE "Transaction";

-- DropTable
DROP TABLE "verification";

-- DropEnum
DROP TYPE "TransactionType";
