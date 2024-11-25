import { Request, Response } from "express";
import { asyncHandler } from "../../utils";
import { prisma } from "../../config/client";

const addCategory = asyncHandler(async (req: Request, res: Response) => {
  const { name, description } = req.body;

  if (!name || !description) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Please provide all the required fields",
    });
  }

  const categoryAlreadyExist = await prisma.category.findFirst({
    where: {
      name: name,
    },
  });

  if (categoryAlreadyExist) {
    return res.status(409).json({
      status: 409,
      body: {
        data: null,
      },
      success: false,
      message: "Category already exist",
    });
  }

  const category = await prisma.category.create({
    data: {
      name: name,
      description: description,
    },
  });

  if (!category) {
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
      data: category,
    },
    success: true,
    message: "Category added successfully",
  });
});

const updateCategory = asyncHandler(async (req: Request, res: Response) => {
  const { categoryId } = req.params;

  const { name, description } = req.body;

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

  const categoryExists = await prisma.category.findFirst({
    where: {
      id: categoryId,
    },
  });

  if (!categoryExists) {
    return res.status(404).json({
      status: 404,
      body: {
        data: null,
      },
      success: false,
      message: `Category with the id ${categoryId} doesnot exist`,
    });
  }

  const updatedCategory = await prisma.category.update({
    where: {
      id: categoryId,
    },
    data: {
      name: name,
      description: description,
    },
  });

  if (!updatedCategory) {
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
      data: updatedCategory,
    },
    success: true,
    message: "Category updated successfully",
  });
});

const deleteCategory = asyncHandler(async (req: Request, res: Response) => {
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

  const deletedCategory = await prisma.category.delete({
    where: {
      id: categoryId,
    },
  });

  if (!deleteCategory) {
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
      data: deletedCategory,
    },
    success: true,
    message: "Category deleted successfully",
  });
});

export const CategoryMutations = {
  addCategory,
  updateCategory,
  deleteCategory,
} as const;
