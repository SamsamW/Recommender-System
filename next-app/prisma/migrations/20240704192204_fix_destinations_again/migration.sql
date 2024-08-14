/*
  Warnings:

  - You are about to drop the column `destination1Rating` on the `GroupQuestionaire` table. All the data in the column will be lost.
  - You are about to drop the column `destination2Rating` on the `GroupQuestionaire` table. All the data in the column will be lost.
  - You are about to drop the column `destination3Rating` on the `GroupQuestionaire` table. All the data in the column will be lost.
  - You are about to drop the column `destination1Rating` on the `MatchQuestionaire` table. All the data in the column will be lost.
  - You are about to drop the column `destination2Rating` on the `MatchQuestionaire` table. All the data in the column will be lost.
  - You are about to drop the column `destination3Rating` on the `MatchQuestionaire` table. All the data in the column will be lost.
  - Added the required column `destinationRating1` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationRating2` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationRating3` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationRating1` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationRating2` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationRating3` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "GroupQuestionaire" DROP COLUMN "destination1Rating",
DROP COLUMN "destination2Rating",
DROP COLUMN "destination3Rating",
ADD COLUMN     "destinationRating1" INTEGER NOT NULL,
ADD COLUMN     "destinationRating2" INTEGER NOT NULL,
ADD COLUMN     "destinationRating3" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "MatchQuestionaire" DROP COLUMN "destination1Rating",
DROP COLUMN "destination2Rating",
DROP COLUMN "destination3Rating",
ADD COLUMN     "destinationRating1" INTEGER NOT NULL,
ADD COLUMN     "destinationRating2" INTEGER NOT NULL,
ADD COLUMN     "destinationRating3" INTEGER NOT NULL;
