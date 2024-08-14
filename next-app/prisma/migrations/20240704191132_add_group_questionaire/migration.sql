/*
  Warnings:

  - You are about to drop the `HobbiesOfQuestionaire` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `budget` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination1Rating` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId1` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId2` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId3` to the `GroupQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `budget` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destination1Rating` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId1` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId2` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.
  - Added the required column `destinationId3` to the `MatchQuestionaire` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HobbiesOfQuestionaire" DROP CONSTRAINT "HobbiesOfQuestionaire_groupQuestionaireId_fkey";

-- DropForeignKey
ALTER TABLE "HobbiesOfQuestionaire" DROP CONSTRAINT "HobbiesOfQuestionaire_hobbyId_fkey";

-- AlterTable
ALTER TABLE "GroupQuestionaire" ADD COLUMN     "accomondations" TEXT[],
ADD COLUMN     "budget" INTEGER NOT NULL,
ADD COLUMN     "destination1Rating" INTEGER NOT NULL,
ADD COLUMN     "destinationId1" INTEGER NOT NULL,
ADD COLUMN     "destinationId2" INTEGER NOT NULL,
ADD COLUMN     "destinationId3" INTEGER NOT NULL,
ADD COLUMN     "hobbies" INTEGER[],
ADD COLUMN     "travelStyles" TEXT[];

-- AlterTable
ALTER TABLE "MatchQuestionaire" ADD COLUMN     "accomondations" TEXT[],
ADD COLUMN     "budget" INTEGER NOT NULL,
ADD COLUMN     "destination1Rating" INTEGER NOT NULL,
ADD COLUMN     "destinationId1" INTEGER NOT NULL,
ADD COLUMN     "destinationId2" INTEGER NOT NULL,
ADD COLUMN     "destinationId3" INTEGER NOT NULL,
ADD COLUMN     "hobbies" INTEGER[],
ADD COLUMN     "travelStyles" TEXT[];

-- DropTable
DROP TABLE "HobbiesOfQuestionaire";

-- AddForeignKey
ALTER TABLE "MatchQuestionaire" ADD CONSTRAINT "MatchQuestionaire_destinationId1_fkey" FOREIGN KEY ("destinationId1") REFERENCES "Destination"("destinationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchQuestionaire" ADD CONSTRAINT "MatchQuestionaire_destinationId2_fkey" FOREIGN KEY ("destinationId2") REFERENCES "Destination"("destinationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MatchQuestionaire" ADD CONSTRAINT "MatchQuestionaire_destinationId3_fkey" FOREIGN KEY ("destinationId3") REFERENCES "Destination"("destinationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupQuestionaire" ADD CONSTRAINT "GroupQuestionaire_destinationId1_fkey" FOREIGN KEY ("destinationId1") REFERENCES "Destination"("destinationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupQuestionaire" ADD CONSTRAINT "GroupQuestionaire_destinationId2_fkey" FOREIGN KEY ("destinationId2") REFERENCES "Destination"("destinationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupQuestionaire" ADD CONSTRAINT "GroupQuestionaire_destinationId3_fkey" FOREIGN KEY ("destinationId3") REFERENCES "Destination"("destinationId") ON DELETE RESTRICT ON UPDATE CASCADE;
