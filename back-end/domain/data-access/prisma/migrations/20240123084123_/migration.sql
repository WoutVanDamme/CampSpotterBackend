-- AlterTable
ALTER TABLE "Camera" ADD COLUMN     "confirmedDeviceId" TEXT,
ADD COLUMN     "deniedDeviceId" TEXT;

-- AddForeignKey
ALTER TABLE "Camera" ADD CONSTRAINT "Camera_confirmedDeviceId_fkey" FOREIGN KEY ("confirmedDeviceId") REFERENCES "Device"("DeviceId") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Camera" ADD CONSTRAINT "Camera_deniedDeviceId_fkey" FOREIGN KEY ("deniedDeviceId") REFERENCES "Device"("DeviceId") ON DELETE SET NULL ON UPDATE CASCADE;
