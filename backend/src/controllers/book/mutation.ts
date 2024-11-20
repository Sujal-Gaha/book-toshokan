import { Request, Response } from "express";
import { asyncHandler } from "../../utils";
import { prisma } from "../../config/client";

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

export const BookMutations = {
  addBook,
} as const;
