/*
  Warnings:

  - You are about to drop the column `confirmVotes` on the `Camera` table. All the data in the column will be lost.
  - You are about to drop the column `denyVotes` on the `Camera` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "Camera" DROP COLUMN "confirmVotes",
DROP COLUMN "denyVotes";
