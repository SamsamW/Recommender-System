/*
  Warnings:

  - Added the required column `destination2Rating` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination3Rating` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination2Rating` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination3Rating` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "GroupQuestionaire" DROP CONSTRAINT "GroupQuestionaire_destinationId1_fkey";

-- DropForeignKey
ALTER TABLE "GroupQuestionaire" DROP CONSTRAINT "GroupQuestionaire_destinationId2_fkey";

-- DropForeignKey
ALTER TABLE "GroupQuestionaire" DROP CONSTRAINT "GroupQuestionaire_destinationId3_fkey";

-- DropForeignKey
ALTER TABLE "MatchQuestionaire" DROP CONSTRAINT "MatchQuestionaire_destinationId1_fkey";

-- DropForeignKey
ALTER TABLE "MatchQuestionaire" DROP CONSTRAINT "MatchQuestionaire_destinationId2_fkey";

-- DropForeignKey
ALTER TABLE "MatchQuestionaire" DROP CONSTRAINT "MatchQuestionaire_destinationId3_fkey";

-- AlterTable
ALTER TABLE "GroupQuestionaire" ADD COLUMN     "destination2Rating" INTEGER NOT NULL,
ADD COLUMN     "destination3Rating" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MatchQuestionaire" ADD COLUMN     "destination2Rating" INTEGER NOT NULL,
ADD COLUMN     "destination3Rating" INTEGER NOT NULL;
