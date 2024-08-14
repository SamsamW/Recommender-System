/*
  Warnings:

  - You are about to drop the column `image` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `latitude` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `longitude` on the `Activity` table. All the data in the column will be lost.
  - The `price` column on the `Activity` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "image",
DROP COLUMN "latitude",
DROP COLUMN "longitude",
ADD COLUMN     "category" TEXT,
DROP COLUMN "price",
ADD COLUMN     "price" INTEGER;
