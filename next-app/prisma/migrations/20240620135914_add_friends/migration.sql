-- CreateTable
CREATE TABLE "IsFriendOf" (
    "userId" INTEGER NOT NULL,
    "friendOfUserId" INTEGER NOT NULL,
    "updatedAt" TIMESTAMP NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "IsFriendOf_pkey" PRIMARY KEY ("friendOfUserId","userId")
);

-- AddForeignKey
ALTER TABLE "IsFriendOf" ADD CONSTRAINT "IsFriendOf_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "IsFriendOf" ADD CONSTRAINT "IsFriendOf_friendOfUserId_fkey" FOREIGN KEY ("friendOfUserId") REFERENCES "User"("userId") ON DELETE RESTRICT ON UPDATE CASCADE;
