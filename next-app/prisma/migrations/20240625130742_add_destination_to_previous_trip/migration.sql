/*
  Warnings:

  - You are about to drop the column `tripId` on the `Destination` table. All the data in the column will be lost.
  - You are about to drop the column `destination` on the `PreviousTrip` table. All the data in the column will be lost.
  - Added the required column `destinationId` to the `PreviousTrip` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Destination" DROP COLUMN "tripId";

-- AlterTable
ALTER TABLE "PreviousTrip" DROP COLUMN "destination",
ADD COLUMN     "destinationId" INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE "PreviousTrip" ADD CONSTRAINT "PreviousTrip_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("destinationId") ON DELETE RESTRICT ON UPDATE CASCADE;
