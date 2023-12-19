-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "owner" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "target" DECIMAL(65,30) NOT NULL,
    "deadline" TIMESTAMP(3) NOT NULL,
    "amountCollected" DECIMAL(65,30) NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donator" (
    "id" SERIAL NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "address" TEXT NOT NULL,
    "amount" DECIMAL(65,30) NOT NULL,

    CONSTRAINT "Donator_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Donator" ADD CONSTRAINT "Donator_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
