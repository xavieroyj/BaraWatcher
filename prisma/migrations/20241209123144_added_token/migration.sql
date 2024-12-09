-- CreateEnum
CREATE TYPE "TransactionType" AS ENUM ('ALLOCATION', 'TRANSFER', 'WITHDRAWAL', 'REWARD');

-- AlterTable
ALTER TABLE "user" ADD COLUMN     "balance" BIGINT NOT NULL DEFAULT 0,
ADD COLUMN     "creditScore" INTEGER NOT NULL DEFAULT 50;

-- CreateTable
CREATE TABLE "TokenPool" (
    "id" SERIAL NOT NULL,
    "totalTokens" BIGINT NOT NULL DEFAULT 100000000000,
    "allocated" BIGINT NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "TokenPool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Transaction" (
    "id" SERIAL NOT NULL,
    "userId" TEXT NOT NULL,
    "type" "TransactionType" NOT NULL,
    "amount" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "note" TEXT,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
