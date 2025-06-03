-- CreateTable
CREATE TABLE "stock_production" (
    "stockId" TEXT NOT NULL,
    "productionId" TEXT NOT NULL,

    CONSTRAINT "stock_production_pkey" PRIMARY KEY ("stockId","productionId")
);

-- CreateTable
CREATE TABLE "production" (
    "id" TEXT NOT NULL,
    "model" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "door" INTEGER NOT NULL,
    "colour" TEXT NOT NULL,
    "airbag" INTEGER NOT NULL,
    "pc" BOOLEAN NOT NULL,
    "gear" BOOLEAN NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "production_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "quality" (
    "id" TEXT NOT NULL,
    "car" TEXT NOT NULL,
    "door" BOOLEAN NOT NULL,
    "engine" BOOLEAN NOT NULL,
    "chassi" BOOLEAN NOT NULL,
    "tire" BOOLEAN NOT NULL,
    "window" BOOLEAN NOT NULL,
    "ligh" BOOLEAN NOT NULL,
    "seat" BOOLEAN NOT NULL,
    "airbag" BOOLEAN NOT NULL,
    "extra" BOOLEAN NOT NULL,
    "eletric" BOOLEAN NOT NULL,
    "aproval" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productionId" TEXT NOT NULL,

    CONSTRAINT "quality_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "stock_production" ADD CONSTRAINT "stock_production_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_production" ADD CONSTRAINT "stock_production_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "production"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quality" ADD CONSTRAINT "quality_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "production"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
