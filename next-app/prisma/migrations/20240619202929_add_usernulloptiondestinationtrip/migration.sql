/*
  Warnings:

  - Made the column `personalState` on table `UserOnTrip` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Trip" DROP CONSTRAINT "Trip_destinationId_fkey";

-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "destinationId" DROP NOT NULL;

-- AlterTable
ALTER TABLE "UserOnTrip" ALTER COLUMN "personalState" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("destinationId") ON DELETE SET NULL ON UPDATE CASCADE;
