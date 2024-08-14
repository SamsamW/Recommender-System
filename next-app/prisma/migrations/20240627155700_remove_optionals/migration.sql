/*
  Warnings:

  - Made the column `country` on table `Destination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `image` on table `Destination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `keywords` on table `Destination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `latitude` on table `Destination` required. This step will fail if there are existing NULL values in that column.
  - Made the column `longitude` on table `Destination` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Destination" ALTER COLUMN "country" SET NOT NULL,
ALTER COLUMN "image" SET NOT NULL,
ALTER COLUMN "keywords" SET NOT NULL,
ALTER COLUMN "latitude" SET NOT NULL,
ALTER COLUMN "longitude" SET NOT NULL;
