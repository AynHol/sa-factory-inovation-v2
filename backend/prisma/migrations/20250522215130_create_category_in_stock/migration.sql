/*
  Warnings:

  - Added the required column `category` to the `stock` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "stock" ADD COLUMN     "category" TEXT NOT NULL;
