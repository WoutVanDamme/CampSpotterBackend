/*
  Warnings:

  - You are about to drop the column `confirmedDeviceId` on the `Camera` table. All the data in the column will be lost.
  - You are about to drop the column `deniedDeviceId` on the `Camera` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Camera" DROP CONSTRAINT "Camera_confirmedDeviceId_fkey";

-- DropForeignKey
ALTER TABLE "Camera" DROP CONSTRAINT "Camera_deniedDeviceId_fkey";

-- AlterTable
ALTER TABLE "Camera" DROP COLUMN "confirmedDeviceId",
DROP COLUMN "deniedDeviceId";

-- CreateTable
CREATE TABLE "_confirmedCamerasRel" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateTable
CREATE TABLE "_deniedCamerasRel" (
    "A" INTEGER NOT NULL,
    "B" TEXT NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_confirmedCamerasRel_AB_unique" ON "_confirmedCamerasRel"("A", "B");

-- CreateIndex
CREATE INDEX "_confirmedCamerasRel_B_index" ON "_confirmedCamerasRel"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_deniedCamerasRel_AB_unique" ON "_deniedCamerasRel"("A", "B");

-- CreateIndex
CREATE INDEX "_deniedCamerasRel_B_index" ON "_deniedCamerasRel"("B");

-- AddForeignKey
ALTER TABLE "_confirmedCamerasRel" ADD CONSTRAINT "_confirmedCamerasRel_A_fkey" FOREIGN KEY ("A") REFERENCES "Camera"("CameraId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_confirmedCamerasRel" ADD CONSTRAINT "_confirmedCamerasRel_B_fkey" FOREIGN KEY ("B") REFERENCES "Device"("DeviceId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_deniedCamerasRel" ADD CONSTRAINT "_deniedCamerasRel_A_fkey" FOREIGN KEY ("A") REFERENCES "Camera"("CameraId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_deniedCamerasRel" ADD CONSTRAINT "_deniedCamerasRel_B_fkey" FOREIGN KEY ("B") REFERENCES "Device"("DeviceId") ON DELETE CASCADE ON UPDATE CASCADE;
