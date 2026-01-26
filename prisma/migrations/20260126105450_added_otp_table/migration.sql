-- CreateTable
CREATE TABLE "UserOTP" (
    "id" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "otp" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserOTP_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserOTP_phone_key" ON "UserOTP"("phone");

-- CreateIndex
CREATE UNIQUE INDEX "UserOTP_otp_key" ON "UserOTP"("otp");
