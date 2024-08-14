/*
  Warnings:

  - You are about to drop the column `personalState` on the `Trip` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Trip" DROP COLUMN "personalState";

-- AlterTable
ALTER TABLE "UserOnTrip" ADD COLUMN     "personalState" BOOLEAN;
