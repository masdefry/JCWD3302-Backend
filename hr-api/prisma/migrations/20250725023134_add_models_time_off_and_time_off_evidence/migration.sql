-- CreateEnum
CREATE TYPE "TimeOffType" AS ENUM ('IZIN_SAKIT', 'IZIN_MENIKAH', 'IZIN_MELAHIRKAN');

-- CreateTable
CREATE TABLE "timeoff" (
    "id" SERIAL NOT NULL,
    "timeOffType" "TimeOffType" NOT NULL,
    "reason" TEXT NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "timeoff_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "timeoff_evidence" (
    "id" SERIAL NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "timeOffId" INTEGER NOT NULL,

    CONSTRAINT "timeoff_evidence_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "timeoff_evidence" ADD CONSTRAINT "timeoff_evidence_timeOffId_fkey" FOREIGN KEY ("timeOffId") REFERENCES "timeoff"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
