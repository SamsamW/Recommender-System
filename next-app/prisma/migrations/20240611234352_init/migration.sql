-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('FEMALE', 'MALE', 'DIVERSE');

-- CreateEnum
CREATE TYPE "Occupation" AS ENUM ('STUDENT', 'WORKING', 'RETIRED', 'UNEMPLOYED');

-- CreateEnum
CREATE TYPE "Status" AS ENUM ('PENDING', 'ACCEPTED', 'REJECTED');

-- CreateEnum
CREATE TYPE "PlanningStage" AS ENUM ('DESTINATION_SEARCH', 'ACTIVITIES_SEARCH', 'FINISHED');

-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('NEW_TRIP', 'NEW_STAGE', 'FINISHED');

-- CreateTable
CREATE TABLE "User" (
    "userId" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "age" INTEGER NOT NULL,
    "gender" "Gender",
    "occupation" "Occupation" NOT NULL,
    "bio" TEXT,
    "password" TEXT NOT NULL,
    "salt" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "User_pkey" PRIMARY KEY ("userId")
);

-- CreateTable
CREATE TABLE "PreviousTrip" (
    "previousTripId" SERIAL NOT NULL,
    "destination" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "budget" INTEGER NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,
    "userId" INTEGER NOT NULL,

    CONSTRAINT "PreviousTrip_pkey" PRIMARY KEY ("previousTripId")
);

-- CreateTable
CREATE TABLE "Activity" (
    "activityId" SERIAL NOT NULL,
    "location" TEXT NOT NULL,
    "cost" INTEGER NOT NULL,
    "openingHours" TIMESTAMP NOT NULL,
    "reachableWithPublicTransport" BOOLEAN NOT NULL,
    "rating" INTEGER NOT NULL,
    "longitudeCoordinates" DOUBLE PRECISION NOT NULL,
    "latitudeCoordinates" DOUBLE PRECISION NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP NOT NULL,

    CONSTRAINT "Activity_pkey" PRIMARY KEY ("activityId")
);

-- CreateTable
CREATE TABLE "Destination" (
    "destinationId" SERIAL NOT NULL,
    "tripId" INTEGER NOT NULL,
    "destination" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Destination_pkey" PRIMARY KEY ("destinationId")
);

-- CreateTable
CREATE TABLE "TripInvitation" (
    "invitationId" SERIAL NOT NULL,
    "status" "Status" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userSendId" INTEGER NOT NULL,
    "userRecieveId" INTEGER NOT NULL,
    "tripId" INTEGER NOT NULL,

    CONSTRAINT "TripInvitation_pkey" PRIMARY KEY ("invitationId")
);

-- CreateTable
CREATE TABLE "Trip" (
    "tripId" SERIAL NOT NULL,
    "startDate" DATE NOT NULL,
    "endDate" DATE NOT NULL,
    "planningStage" "PlanningStage" NOT NULL,
    "personalState" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "destinationId" INTEGER NOT NULL,

    CONSTRAINT "Trip_pkey" PRIMARY KEY ("tripId")
);

-- CreateTable
CREATE TABLE "Notification" (
    "notificationId" SERIAL NOT NULL,
    "notificationType" "NotificationType" NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userUserId" INTEGER NOT NULL,

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("notificationId")
);

-- CreateTable
CREATE TABLE "Interest" (
    "interestId" SERIAL NOT NULL,
    "interest" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Interest_pkey" PRIMARY KEY ("interestId")
);

-- CreateTable
CREATE TABLE "KeywordActivity" (
    "keywordActivityId" SERIAL NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeywordActivity_pkey" PRIMARY KEY ("keywordActivityId")
);

-- CreateTable
CREATE TABLE "KeywordPreviousTrip" (
    "keywordPreviousTripId" SERIAL NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeywordPreviousTrip_pkey" PRIMARY KEY ("keywordPreviousTripId")
);

-- CreateTable
CREATE TABLE "KeywordDestination" (
    "keywordDestinationId" SERIAL NOT NULL,
    "keyword" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeywordDestination_pkey" PRIMARY KEY ("keywordDestinationId")
);

-- CreateTable
CREATE TABLE "InterestOfUser" (
    "userId" INTEGER NOT NULL,
    "interestId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "InterestOfUser_pkey" PRIMARY KEY ("userId","interestId")
);

-- CreateTable
CREATE TABLE "ActivityOnTrip" (
    "tripId" INTEGER NOT NULL,
    "activityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ActivityOnTrip_pkey" PRIMARY KEY ("tripId","activityId")
);

-- CreateTable
CREATE TABLE "UserOnTrip" (
    "tripId" INTEGER NOT NULL,
    "userId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserOnTrip_pkey" PRIMARY KEY ("tripId","userId")
);

-- CreateTable
CREATE TABLE "KeywordsOfPreviousTrip" (
    "previousTripId" INTEGER NOT NULL,
    "keywordPreviousTripId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeywordsOfPreviousTrip_pkey" PRIMARY KEY ("previousTripId","keywordPreviousTripId")
);

-- CreateTable
CREATE TABLE "KeywordsOfDestination" (
    "destinationId" INTEGER NOT NULL,
    "keywordDestinationId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeywordsOfDestination_pkey" PRIMARY KEY ("destinationId","keywordDestinationId")
);

-- CreateTable
CREATE TABLE "KeywordsOfActivity" (
    "activityId" INTEGER NOT NULL,
    "keywordActivityId" INTEGER NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KeywordsOfActivity_pkey" PRIMARY KEY ("activityId","keywordActivityId")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "PreviousTrip" ADD CONSTRAINT "PreviousTrip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripInvitation" ADD CONSTRAINT "TripInvitation_userSendId_fkey" FOREIGN KEY ("userSendId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripInvitation" ADD CONSTRAINT "TripInvitation_userRecieveId_fkey" FOREIGN KEY ("userRecieveId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TripInvitation" ADD CONSTRAINT "TripInvitation_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("tripId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trip" ADD CONSTRAINT "Trip_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("destinationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_userUserId_fkey" FOREIGN KEY ("userUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestOfUser" ADD CONSTRAINT "InterestOfUser_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "InterestOfUser" ADD CONSTRAINT "InterestOfUser_interestId_fkey" FOREIGN KEY ("interestId") REFERENCES "Interest"("interestId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityOnTrip" ADD CONSTRAINT "ActivityOnTrip_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("tripId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ActivityOnTrip" ADD CONSTRAINT "ActivityOnTrip_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("activityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnTrip" ADD CONSTRAINT "UserOnTrip_tripId_fkey" FOREIGN KEY ("tripId") REFERENCES "Trip"("tripId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "UserOnTrip" ADD CONSTRAINT "UserOnTrip_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordsOfPreviousTrip" ADD CONSTRAINT "KeywordsOfPreviousTrip_previousTripId_fkey" FOREIGN KEY ("previousTripId") REFERENCES "PreviousTrip"("previousTripId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordsOfPreviousTrip" ADD CONSTRAINT "KeywordsOfPreviousTrip_keywordPreviousTripId_fkey" FOREIGN KEY ("keywordPreviousTripId") REFERENCES "KeywordPreviousTrip"("keywordPreviousTripId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordsOfDestination" ADD CONSTRAINT "KeywordsOfDestination_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("destinationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordsOfDestination" ADD CONSTRAINT "KeywordsOfDestination_keywordDestinationId_fkey" FOREIGN KEY ("keywordDestinationId") REFERENCES "KeywordDestination"("keywordDestinationId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordsOfActivity" ADD CONSTRAINT "KeywordsOfActivity_activityId_fkey" FOREIGN KEY ("activityId") REFERENCES "Activity"("activityId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "KeywordsOfActivity" ADD CONSTRAINT "KeywordsOfActivity_keywordActivityId_fkey" FOREIGN KEY ("keywordActivityId") REFERENCES "KeywordActivity"("keywordActivityId") ON DELETE RESTRICT ON UPDATE CASCADE;
