/*
  Warnings:

  - You are about to drop the column `scalabilityRating` on the `MatchQuestionaire` table. All the data in the column will be lost.
  - Added the required column `sociabilityRating` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "MatchQuestionaire" DROP COLUMN "scalabilityRating",
ADD COLUMN     "sociabilityRating" INTEGER NOT NULL;
