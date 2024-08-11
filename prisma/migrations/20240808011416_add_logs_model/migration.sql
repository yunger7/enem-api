-- CreateTable
CREATE TABLE "Log" (
    "id" SERIAL NOT NULL,
    "ip" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "method" TEXT NOT NULL,
    "userAgent" TEXT,
    "referer" TEXT,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT,
    "region" TEXT,
    "city" TEXT,
    "ll" TEXT,

    CONSTRAINT "Log_pkey" PRIMARY KEY ("id")
);
