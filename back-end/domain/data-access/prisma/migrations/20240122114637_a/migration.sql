-- CreateTable
CREATE TABLE "Device" (
    "DeviceId" TEXT NOT NULL,

    CONSTRAINT "Device_pkey" PRIMARY KEY ("DeviceId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Device_DeviceId_key" ON "Device"("DeviceId");
