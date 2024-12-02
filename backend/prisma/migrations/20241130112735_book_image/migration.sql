/*
  Warnings:

  - You are about to drop the column `rating` on the `Feedback` table. All the data in the column will be lost.
  - Added the required column `image` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pages` to the `Book` table without a default value. This is not possible if the table is not empty.
  - Added the required column `averageRating` to the `Feedback` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalRatings` to the `Feedback` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Book" ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "pages" INTEGER NOT NULL,
ADD COLUMN     "subImages" TEXT[] DEFAULT ARRAY[]::TEXT[];

-- AlterTable
ALTER TABLE "Feedback" DROP COLUMN "rating",
ADD COLUMN     "averageRating" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "totalRatings" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "image" TEXT;
