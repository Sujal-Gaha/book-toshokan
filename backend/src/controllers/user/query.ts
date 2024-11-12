import { Response } from "express";
import { asyncHandler } from "../../utils";
import { prisma } from "../../config/client";

const getAllUsers = asyncHandler(async (req: Request, res: Response) => {
  const users = await prisma.user.findMany();

  if (!users) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: "There are no users",
    });
  }

  if (users.length === 0) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: "There are no users",
    });
  }

  return res.status(200).json({
    status: 200,
    body: {
      data: users,
    },
    success: true,
    message: "Fetched all the users successfully",
  });
});

export const UserQueries = {
  getAllUsers,
} as const;
