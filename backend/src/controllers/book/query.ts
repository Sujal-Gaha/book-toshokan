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

const getBooksByCategoryId = asyncHandler(
  async (req: Request, res: Response) => {
    const { categoryId } = req.params;

    if (!categoryId) {
      return res.status(400).json({
        status: 400,
        body: {
          data: null,
        },
        success: false,
        message: "Please provide the category id",
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

    const books = await prisma.book.findMany({
      where: {
        categoryId: categoryId,
      },
    });

    if (!books) {
      return res.status(404).json({
        status: 404,
        body: {
          data: null,
        },
        success: false,
        message: "There are no books available with that category",
      });
    }

    return res.status(200).json({
      status: 200,
      body: {
        data: books,
      },
      success: true,
      message: `Fetched all the books of category ${categoryExist.name}`,
    });
  }
);

const getBooksByAuthorId = asyncHandler(async (req: Request, res: Response) => {
  const { authorId } = req.params;

  if (!authorId) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Please provide the author id",
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

  const books = await prisma.book.findMany({
    where: {
      authorId: authorId,
    },
  });

  if (!books) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: `There are no books of the author ${authorExist.name}`,
    });
  }

  return res.status(200).json({
    status: 200,
    body: {
      data: books,
    },
    success: true,
    message: `Fetched all the books by the author ${authorExist.name}`,
  });
});

export const BookQueries = {
  getAllBooks,
  getBooksByCategoryId,
  getBooksByAuthorId,
} as const;
