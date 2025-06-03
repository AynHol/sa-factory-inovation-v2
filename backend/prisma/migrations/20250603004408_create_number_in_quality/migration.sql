/*
  Warnings:

  - Added the required column `number` to the `quality` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "quality" ADD COLUMN     "number" INTEGER NOT NULL;
