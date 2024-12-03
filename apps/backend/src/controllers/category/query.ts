import { Request, Response } from "express";
import { asyncHandler } from "../../utils";
import { prisma } from "../../config/client";

const getAllQuery = asyncHandler(async (req: Request, res: Response) => {
  const category = await prisma.category.findMany({});

  if (!category) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: "No category found",
    });
  }

  return res.status(200).json({
    status: 200,
    body: {
      data: category,
    },
    success: true,
    message: "Fetched all the category successfully",
  });
});

export const CategoryQueries = {
  getAllQuery,
} as const;
