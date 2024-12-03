import { Request, Response } from "express";
import { asyncHandler } from "../../utils";
import { prisma } from "../../config/client";

const getAllUserBookSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const { userId } = req.body;

    const userBookSubscriptions = await prisma.userBookSubscription.findMany({
      where: {
        userId: userId,
      },
    });

    if (!userBookSubscriptions) {
      return res.status(404).json({
        status: 404,
        body: {
          data: null,
        },
        success: false,
        message: "No books subscription found",
      });
    }

    return res.status(200).json({
      status: 200,
      body: {
        data: userBookSubscriptions,
      },
      success: true,
      message: "Fetched all the subscribed books",
    });
  }
);

export const UserBookSubscriptionQueries = {
  getAllUserBookSubscription,
} as const;
