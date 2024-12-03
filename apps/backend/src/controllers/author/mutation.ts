import { Request, Response } from "express";
import { asyncHandler } from "../../utils";
import { prisma } from "../../config/client";

const addAuthor = asyncHandler(async (req: Request, res: Response) => {
  const { name, about } = req.body;

  if (!name || !about) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Please provide all the required fields",
    });
  }

  const authorAlreadyExist = await prisma.author.findFirst({
    where: {
      name: name,
    },
  });

  if (authorAlreadyExist) {
    return res.status(409).json({
      status: 409,
      body: {
        data: null,
      },
      success: false,
      message: "Author already exists",
    });
  }

  const newAuthor = await prisma.author.create({
    data: {
      name: name,
      about: about,
    },
  });

  if (!newAuthor) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Failed to add the author",
    });
  }

  return res.status(201).json({
    status: 201,
    body: {
      data: newAuthor,
    },
    success: true,
    message: "Added the author successfully",
  });
});

const updateAuthor = asyncHandler(async (req: Request, res: Response) => {
  const { authorId } = req.params;

  const { name, about } = req.body;

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

  const authorExists = await prisma.author.findFirst({
    where: {
      id: authorId,
    },
  });

  if (!authorExists) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: `Author with the id ${authorId} doesnot exist`,
    });
  }

  const updatedAuthor = await prisma.author.update({
    where: {
      id: authorId,
    },
    data: {
      name: name,
      about: about,
    },
  });

  return res.status(200).json({
    status: 200,
    body: {
      data: updatedAuthor,
    },
    success: true,
    message: "Updated the author successfully",
  });
});

const deleteAuthor = asyncHandler(async (req: Request, res: Response) => {
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

  const deletedAuthor = await prisma.author.delete({
    where: {
      id: authorId,
    },
  });

  return res.status(200).json({
    status: 200,
    body: {
      data: deletedAuthor,
    },
    success: true,
    message: "Deleted the author successfully",
  });
});

export const AuthorMutations = {
  addAuthor,
  updateAuthor,
  deleteAuthor,
} as const;
