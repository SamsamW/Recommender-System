/*
  Warnings:

  - You are about to drop the column `cost` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `createdAt` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `latitudeCoordinates` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `location` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `longitudeCoordinates` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `rating` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `reachableWithPublicTransport` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the column `updatedAt` on the `Activity` table. All the data in the column will be lost.
  - You are about to drop the `KeywordActivity` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KeywordsOfActivity` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `title` to the `Activity` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "KeywordsOfActivity" DROP CONSTRAINT "KeywordsOfActivity_activityId_fkey";

-- DropForeignKey
ALTER TABLE "KeywordsOfActivity" DROP CONSTRAINT "KeywordsOfActivity_keywordActivityId_fkey";

-- AlterTable
ALTER TABLE "Activity" DROP COLUMN "cost",
DROP COLUMN "createdAt",
DROP COLUMN "latitudeCoordinates",
DROP COLUMN "location",
DROP COLUMN "longitudeCoordinates",
DROP COLUMN "name",
DROP COLUMN "rating",
DROP COLUMN "reachableWithPublicTransport",
DROP COLUMN "updatedAt",
ADD COLUMN     "address" TEXT,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "duration" INTEGER,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "latitude" INTEGER,
ADD COLUMN     "longitude" INTEGER,
ADD COLUMN     "price" INTEGER,
ADD COLUMN     "reachablePublicTransport" BOOLEAN,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "website" TEXT,
ALTER COLUMN "openingHours" DROP NOT NULL,
ALTER COLUMN "openingHours" SET DATA TYPE TEXT;

-- DropTable
DROP TABLE "KeywordActivity";

-- DropTable
DROP TABLE "KeywordsOfActivity";
