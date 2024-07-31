-- CreateEnum
CREATE TYPE "SessionStatus" AS ENUM ('PENDING', 'SCHEDULED', 'CANCELED', 'COMPLETED');

-- AlterTable
ALTER TABLE "Session" ADD COLUMN     "status" "SessionStatus" NOT NULL DEFAULT 'PENDING';
