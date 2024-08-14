/*
  Warnings:

  - You are about to drop the `KeywordDestination` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `KeywordsOfDestination` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "KeywordsOfDestination" DROP CONSTRAINT "KeywordsOfDestination_destinationId_fkey";

-- DropForeignKey
ALTER TABLE "KeywordsOfDestination" DROP CONSTRAINT "KeywordsOfDestination_keywordDestinationId_fkey";

-- AlterTable
ALTER TABLE "Destination" ALTER COLUMN "latitude" DROP NOT NULL,
ALTER COLUMN "longitude" DROP NOT NULL;

-- DropTable
DROP TABLE "KeywordDestination";

-- DropTable
DROP TABLE "KeywordsOfDestination";
