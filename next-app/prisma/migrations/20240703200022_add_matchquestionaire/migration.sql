-- CreateEnum
CREATE TYPE "DayNightType" AS ENUM ('EARLYBIRD', 'NIGHTOWL', 'FLEXIBLE');

-- CreateEnum
CREATE TYPE "TravelPace" AS ENUM ('FAST', 'MEDIUM', 'SLOW');

-- CreateEnum
CREATE TYPE "GroupSize" AS ENUM ('SMALL', 'MEDIUM', 'BIG');

-- AlterEnum
ALTER TYPE "NotificationType" ADD VALUE 'NEW_MATCH';

-- CreateTable
CREATE TABLE "MatchQuestionaire" (
    "MatchQuestionaireId" SERIAL NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "reliabilityRating" INTEGER NOT NULL,
    "flexibilityRating" INTEGER NOT NULL,
    "organizationRating" INTEGER NOT NULL,
    "scalabilityRating" INTEGER NOT NULL,
    "sharedInterestsRating" INTEGER NOT NULL,
    "daynightPreference" "DayNightType" NOT NULL,
    "travelPacePreference" "TravelPace" NOT NULL,
    "foodPreference" INTEGER NOT NULL,
    "groupSizePreference" "GroupSize" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "MatchQuestionaire_pkey" PRIMARY KEY ("MatchQuestionaireId")
);

-- AddForeignKey
ALTER TABLE "MatchQuestionaire" ADD CONSTRAINT "MatchQuestionaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
