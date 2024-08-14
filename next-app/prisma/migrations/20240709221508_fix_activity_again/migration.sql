/*
  Warnings:

  - You are about to drop the column `destination` on the `Destination` table. All the data in the column will be lost.
  - Added the required column `city` to the `Destination` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Destination" DROP COLUMN "destination",
ADD COLUMN     "city" TEXT NOT NULL;
