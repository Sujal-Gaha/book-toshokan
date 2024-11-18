import { Response } from "express";
import { prisma } from "../../config/client";

export const checkUserExists = async (userId: string, res: Response) => {
  if (!userId) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Please provide the userId",
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
  });

  if (!user) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: `User with the id ${userId} doesnot exist`,
    });
  }

  return user;
};

export const checkBookExists = async (bookId: string, res: Response) => {
  if (!bookId) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Please provide the bookId",
    });
  }

  const book = await prisma.book.findMany({
    where: {
      id: bookId,
    },
  });

  if (!book) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: `Book with the id ${bookId} doesnot exist`,
    });
  }

  return book;
};

export const checkAuthorExists = async (authorId: string, res: Response) => {
  if (!authorId) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Please provide the authorId",
    });
  }

  const author = await prisma.author.findFirst({
    where: {
      id: authorId,
    },
  });

  if (!author) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: `Author with the id ${authorId} doesnot exist`,
    });
  }

  return author;
};

export const checkCategoryExists = async (
  categoryId: string,
  res: Response
) => {
  if (!categoryId) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Please provide the categoryId",
    });
  }

  const category = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!category) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: `Category with the id ${categoryId} doesnot exist`,
    });
  }

  return category;
};

export const checkUserBookSubscription = async (
  userBookSubscriptionId: string,
  res: Response
) => {
  if (!userBookSubscriptionId) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Please provide the userBookSubscriptionId",
    });
  }

  const userBookSubscription = await prisma.userBookSubscription.findFirst({
    where: {
      id: userBookSubscriptionId,
    },
  });

  if (!userBookSubscription) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: `UserBookSubscription with the id ${userBookSubscriptionId} doesnot exist`,
    });
  }

  return userBookSubscription;
};
