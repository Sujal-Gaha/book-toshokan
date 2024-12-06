/*
  Warnings:

  - A unique constraint covering the columns `[bookId]` on the table `Feedback` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Feedback_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Feedback_bookId_key" ON "Feedback"("bookId");
