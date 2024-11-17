import { Request, Response } from "express";
import { asyncHandler } from "../../utils";
import { prisma } from "../../config/client";

const getAllBooks = asyncHandler(async (req: Request, res: Response) => {
  const books = await prisma.book.findMany({});

  if (!books) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: "There are no books",
    });
  }

  return res.status(200).json({
    status: 200,
    body: {
      data: books,
    },
    success: true,
    message: "Fetched all the books successfully",
  });
});

export const BookQueries = {
  getAllBooks,
} as const;
