/*
  Warnings:

  - You are about to drop the column `destinationId1` on the `GroupQuestionaire` table. All the data in the column will be lost.
  - You are about to drop the column `destinationId2` on the `GroupQuestionaire` table. All the data in the column will be lost.
  - You are about to drop the column `destinationId3` on the `GroupQuestionaire` table. All the data in the column will be lost.
  - You are about to drop the column `destinationId1` on the `MatchQuestionaire` table. All the data in the column will be lost.
  - You are about to drop the column `destinationId2` on the `MatchQuestionaire` table. All the data in the column will be lost.
  - You are about to drop the column `destinationId3` on the `MatchQuestionaire` table. All the data in the column will be lost.
  - Added the required column `destination1` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination2` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination3` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination1` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination2` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination3` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupQuestionaire" DROP COLUMN "destinationId1",
DROP COLUMN "destinationId2",
DROP COLUMN "destinationId3",
ADD COLUMN     "destination1" TEXT NOT NULL,
ADD COLUMN     "destination2" TEXT NOT NULL,
ADD COLUMN     "destination3" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "MatchQuestionaire" DROP COLUMN "destinationId1",
DROP COLUMN "destinationId2",
DROP COLUMN "destinationId3",
ADD COLUMN     "destination1" TEXT NOT NULL,
ADD COLUMN     "destination2" TEXT NOT NULL,
ADD COLUMN     "destination3" TEXT NOT NULL;
