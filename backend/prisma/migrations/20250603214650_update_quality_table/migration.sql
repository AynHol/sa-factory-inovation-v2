/*
  Warnings:

  - A unique constraint covering the columns `[productionId]` on the table `quality` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "quality_productionId_key" ON "quality"("productionId");
