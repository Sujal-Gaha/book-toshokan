import { Request, Response } from "express";
import { asyncHandler } from "../../utils";
import { prisma } from "../../config/client";

const getAllAuthors = asyncHandler(async (req: Request, res: Response) => {
  const authors = await prisma.author.findMany({});

  if (!authors.length) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: "There are no authors",
    });
  }

  return res.status(200).json({
    status: 200,
    body: {
      data: authors,
    },
    success: true,
    message: "Fetched all the authors successfully",
  });
});

export const AuthorQueries = {
  getAllAuthors,
} as const;
