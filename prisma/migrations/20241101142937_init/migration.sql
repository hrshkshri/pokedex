/*
  Warnings:

  - You are about to drop the `pokemon` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "pokemon";

-- CreateTable
CREATE TABLE "Pokemon" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "types" TEXT[],
    "sprite" TEXT NOT NULL,
    "img" TEXT NOT NULL,

    CONSTRAINT "Pokemon_pkey" PRIMARY KEY ("id")
);
