import { Request, Response } from "express";
import { asyncHandler } from "../../utils";
import { prisma } from "../../config/client";
import {
  checkBookExists,
  checkUserBookSubscription,
  checkUserExists,
} from "../common";

const addBook = asyncHandler(async (req: Request, res: Response) => {
  const { name, description, publishedOn, categoryId, authorId } = req.body;

  if (!(name && description && publishedOn && categoryId && authorId)) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Please provide all the necessary fields",
    });
  }

  const categoryExist = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!categoryExist) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: `Category with the id ${categoryId} doesnot exist`,
    });
  }

  const authorExist = await prisma.author.findFirst({
    where: {
      id: authorId,
    },
  });

  if (!authorExist) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: `Author with the id ${authorId} doesnot exist`,
    });
  }

  const bookAlreadyExist = await prisma.book.findFirst({
    where: {
      name: name,
    },
  });

  if (bookAlreadyExist) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Book already exists",
    });
  }

  const book = await prisma.book.create({
    data: {
      name: name,
      description: description,
      publishedOn: publishedOn,
      categoryId: categoryId,
      authorId: authorId,
    },
  });

  if (!book) {
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
      data: book,
    },
    success: true,
    message: "Added the book successfully",
  });
});

const subscribeToBookByUser = asyncHandler(
  async (req: Request, res: Response) => {
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
  }
);

const updateBookSubscriptionByUser = asyncHandler(
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

export const BookMutations = {
  addBook,
  subscribeToBookByUser,
  updateBookSubscriptionByUser,
} as const;
