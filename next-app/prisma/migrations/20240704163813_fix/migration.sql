-- CreateTable
CREATE TABLE "GroupQuestionaire" (
    "groupQuestionaireId" SERIAL NOT NULL,
    "userId" INTEGER NOT NULL,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "GroupQuestionaire_pkey" PRIMARY KEY ("groupQuestionaireId")
);

-- CreateTable
CREATE TABLE "Hobby" (
    "hobbyId" SERIAL NOT NULL,
    "hobby" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Hobby_pkey" PRIMARY KEY ("hobbyId")
);

-- CreateTable
CREATE TABLE "HobbiesOfQuestionaire" (
    "groupQuestionaireId" INTEGER NOT NULL,
    "hobbyId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "HobbiesOfQuestionaire_pkey" PRIMARY KEY ("groupQuestionaireId","hobbyId")
);

-- AddForeignKey
ALTER TABLE "GroupQuestionaire" ADD CONSTRAINT "GroupQuestionaire_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "GroupQuestionaire" ADD CONSTRAINT "GroupQuestionaire_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("tripId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HobbiesOfQuestionaire" ADD CONSTRAINT "HobbiesOfQuestionaire_groupQuestionaireId_fkey" FOREIGN KEY ("groupQuestionaireId") REFERENCES "GroupQuestionaire"("groupQuestionaireId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "HobbiesOfQuestionaire" ADD CONSTRAINT "HobbiesOfQuestionaire_hobbyId_fkey" FOREIGN KEY ("hobbyId") REFERENCES "Hobby"("hobbyId") ON DELETE RESTRICT ON UPDATE CASCADE;
