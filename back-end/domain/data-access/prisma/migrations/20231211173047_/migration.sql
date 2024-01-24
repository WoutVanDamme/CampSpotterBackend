/*
  Warnings:

  - Added the required column `type` to the `Camera` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "CameraType" AS ENUM ('SECURITY', 'SPEED', 'FACEREC');

-- AlterTable
ALTER TABLE "Camera" ADD COLUMN     "type" "CameraType" NOT NULL;
