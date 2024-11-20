import { Request, Response } from "express";
import { asyncHandler } from "../../utils";
import { prisma } from "../../config/client";
import {
  checkBookExists,
  checkUserBookSubscription,
  checkUserExists,
} from "../common";

const subscribeToBook = asyncHandler(async (req: Request, res: Response) => {
  const { userId, bookId, readStatus } = req.body;

  const user = await checkUserExists(userId, res);

  const book = await checkBookExists(bookId, res);

  if (!readStatus) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Please provide the readStatus",
    });
  }

  const userBookSubscriptionAlreadyExists =
    await prisma.userBookSubscription.findFirst({
      where: {
        userId: userId,
        bookId: bookId,
      },
    });

  if (userBookSubscriptionAlreadyExists) {
    return res.status(409).json({
      status: 409,
      body: {
        data: null,
      },
      success: false,
      message: "Already subscribed to the book",
    });
  }

  const userBookSubscription = await prisma.userBookSubscription.create({
    data: {
      userId: userId,
      bookId: bookId,
      readStatus: readStatus,
    },
  });

  if (!userBookSubscription) {
    return res.status(500).json({
      status: 500,
      body: {
        data: null,
      },
      success: false,
      message: "Something went wrong",
    });
  }

  return res.status(201).json({
    status: 201,
    body: {
      data: {
        user: user,
        book: book,
        user_book_subscription: userBookSubscription,
      },
    },
    success: true,
    message: "Subscribed to the book successfully",
  });
});

const updateBookSubscription = asyncHandler(
  async (req: Request, res: Response) => {
    const { userBookSubscriptionId, readStatus } = req.body;

    const userBookSubscription = await checkUserBookSubscription(
      userBookSubscriptionId,
      res
    );

    const updatedUserBookSubscription =
      await prisma.userBookSubscription.update({
        where: {
          id: userBookSubscriptionId,
        },
        data: {
          readStatus: readStatus,
        },
      });

    if (!updatedUserBookSubscription) {
      return res.status(500).json({
        status: 500,
        body: {
          data: null,
        },
        success: false,
        message: "Something went wrong",
      });
    }

    return res.status(200).json({
      status: 200,
      body: {
        data: updatedUserBookSubscription,
      },
      success: true,
      message: "Updated the read status",
    });
  }
);

const unsubscribeToBook = asyncHandler(async (req: Request, res: Response) => {
  const { userBookSubscriptionId } = req.body;

  const userBookSubscription = await checkUserBookSubscription(
    userBookSubscriptionId,
    res
  );

  const unsubscribedBook = await prisma.userBookSubscription.delete({
    where: {
      id: userBookSubscriptionId,
    },
  });

  if (!unsubscribedBook) {
    return res.status(500).json({
      status: 500,
      body: {
        data: null,
      },
      success: false,
      message: "Something went wrong",
    });
  }

  return res.status(200).json({
    status: 200,
    body: {
      data: unsubscribedBook,
    },
    success: true,
    message: "Unsubscribed to the book successfully",
  });
});

export const UserBookSubscriptionMutations = {
  subscribeToBook,
  updateBookSubscription,
  unsubscribeToBook,
} as const;
