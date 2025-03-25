/*
  Warnings:

  - You are about to drop the column `about` on the `Author` table. All the data in the column will be lost.
  - Added the required column `description` to the `Author` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Author" DROP COLUMN "about",
ADD COLUMN     "description" TEXT NOT NULL;
