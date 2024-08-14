/*
  Warnings:

  - Made the column `name` on table `Trip` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Destination" ADD COLUMN     "country" TEXT,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "keywords" TEXT,
ADD COLUMN     "latitude" DOUBLE PRECISION,
ADD COLUMN     "longitude" DOUBLE PRECISION;

-- AlterTable
ALTER TABLE "Trip" ALTER COLUMN "name" SET NOT NULL;
