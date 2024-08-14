-- DropForeignKey
ALTER TABLE "PreviousTrip" DROP CONSTRAINT "PreviousTrip_destinationId_fkey";

-- AlterTable
ALTER TABLE "PreviousTrip" ALTER COLUMN "destinationId" DROP NOT NULL;

-- AddForeignKey
ALTER TABLE "PreviousTrip" ADD CONSTRAINT "PreviousTrip_destinationId_fkey" FOREIGN KEY ("destinationId") REFERENCES "Destination"("destinationId") ON DELETE SET NULL ON UPDATE CASCADE;
