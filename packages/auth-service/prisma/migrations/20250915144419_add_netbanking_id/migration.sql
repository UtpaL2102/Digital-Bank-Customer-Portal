/*
  Warnings:

  - A unique constraint covering the columns `[netbanking_id]` on the table `User` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "netbanking_id" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "User_netbanking_id_key" ON "User"("netbanking_id");
