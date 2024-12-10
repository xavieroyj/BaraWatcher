-- CreateEnum
CREATE TYPE "ValidationRequestStatus" AS ENUM ('PENDING', 'VALIDATED', 'REJECTED');

-- CreateEnum
CREATE TYPE "ValidationRequestType" AS ENUM ('SITE', 'CONTENT', 'IMAGE');

-- CreateTable
CREATE TABLE "ValidationRequest" (
    "id" SERIAL NOT NULL,
    "status" "ValidationRequestStatus" NOT NULL,
    "type" "ValidationRequestType" NOT NULL,
    "content" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ValidationRequest_pkey" PRIMARY KEY ("id")
);
