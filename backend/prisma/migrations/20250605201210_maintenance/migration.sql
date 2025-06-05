-- CreateTable
CREATE TABLE "users" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "devMode" BOOLEAN NOT NULL,
    "avatar" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "stock" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amount" INTEGER NOT NULL,
    "description" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "markId" TEXT NOT NULL,

    CONSTRAINT "stock_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "mark" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "mark_pkey" PRIMARY KEY ("id")
);

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
    "number" INTEGER,
    "resume" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "productionId" TEXT NOT NULL,

    CONSTRAINT "quality_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "maintenance" (
    "id" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL,
    "updatedAr" TIMESTAMP(3) NOT NULL,
    "qualityId" TEXT NOT NULL,

    CONSTRAINT "maintenance_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "stock_name_key" ON "stock"("name");

-- CreateIndex
CREATE UNIQUE INDEX "mark_name_key" ON "mark"("name");

-- CreateIndex
CREATE UNIQUE INDEX "quality_productionId_key" ON "quality"("productionId");

-- AddForeignKey
ALTER TABLE "stock" ADD CONSTRAINT "stock_markId_fkey" FOREIGN KEY ("markId") REFERENCES "mark"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_production" ADD CONSTRAINT "stock_production_stockId_fkey" FOREIGN KEY ("stockId") REFERENCES "stock"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "stock_production" ADD CONSTRAINT "stock_production_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "production"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "quality" ADD CONSTRAINT "quality_productionId_fkey" FOREIGN KEY ("productionId") REFERENCES "production"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "maintenance" ADD CONSTRAINT "maintenance_qualityId_fkey" FOREIGN KEY ("qualityId") REFERENCES "quality"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
