import { Request, Response } from 'express';
import { CategoryRepository } from '../../infrastructure/database/category.repository.impl';
import { CreateCategoryUseCase } from '../../application/use-cases/category/create-category';
import { FindCategoryByIdUseCase } from '../../application/use-cases/category/find-category-by-id';
import { UpdateCategoryUseCase } from '../../application/use-cases/category/update-category';
import { DeleteCategoryUseCase } from '../../application/use-cases/category/delete-category';
import { FindAllCategoryUseCase } from '../../application/use-cases/category/find-all-category';
import { StatusCodes } from 'http-status-codes';
import {
  TApiError,
  TApiResponse,
  TCreateCategoryOutput,
  TDeleteCategoryOutput,
  TFindAllCategoryOutput,
  TFindCategoryByIdOutput,
  TUpdateCategoryOutput,
} from '@book-toshokan/libs/domain';

const categoryRepository = new CategoryRepository();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const findAllCategoryUseCase = new FindAllCategoryUseCase(categoryRepository);
const findCategoryByIdUseCase = new FindCategoryByIdUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

export class CategoryController {
  static async createCategory(req: Request, res: Response) {
    const { name, description } = req.body;

    if (!name || !description) {
      const response: TApiError = {
        status: StatusCodes.BAD_REQUEST,
        body: {
          data: null,
          message: 'Name and description are required',
        },
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
      const category = await createCategoryUseCase.execute({
        name: name,
        description: description,
      });

      const response: TApiResponse<TCreateCategoryOutput> = {
        status: StatusCodes.CREATED,
        body: {
          data: {
            id: category.id,
            name: category.name,
            description: category.description,
          },
          message: 'Created category successfully',
        },
      };

      return res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      console.error('Error while creating category:', error);

      const response: TApiError = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          data: null,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
      };

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  static async findAllCategory(req: Request, res: Response) {
    try {
      const categories = await findAllCategoryUseCase.execute();

      const response: TApiResponse<TFindAllCategoryOutput> = {
        status: StatusCodes.OK,
        body: {
          data: categories.map((category) => ({
            id: category.id,
            name: category.name,
            description: category.description,
          })),
          message: 'Fetched all the categories successfully',
        },
      };

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error('Error while fetching categories:', error);

      const response: TApiError = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          data: null,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
      };

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  static async findCategoryById(req: Request, res: Response) {
    const { categoryId } = req.params;

    if (!categoryId) {
      const response: TApiError = {
        status: StatusCodes.BAD_REQUEST,
        body: {
          data: null,
          message: 'Please provide the category id',
        },
      };

      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
      const categoryById = await findCategoryByIdUseCase.execute({
        id: categoryId,
      });

      if (!categoryById) {
        const response: TApiError = {
          status: StatusCodes.NOT_FOUND,
          body: {
            data: null,
            message: 'Category not found',
          },
        };

        return res.status(StatusCodes.NOT_FOUND).json(response);
      }

      const response: TApiResponse<TFindCategoryByIdOutput> = {
        status: StatusCodes.OK,
        body: {
          data: {
            id: categoryById.id,
            name: categoryById.name,
            description: categoryById.description,
          },
          message: 'Fetched the category successfully',
        },
      };

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error('Error while fetching category by id:', error);

      const response: TApiError = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          data: null,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
      };

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  static async updateCategory(req: Request, res: Response) {
    const { categoryId } = req.params;

    if (!categoryId) {
      const response: TApiError = {
        status: StatusCodes.BAD_REQUEST,
        body: {
          data: null,
          message: 'Please provide the category id',
        },
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    const { name, description } = req.body;

    if (!name || !description) {
      const response: TApiError = {
        status: StatusCodes.BAD_REQUEST,
        body: {
          data: null,
          message: 'Name and description are required',
        },
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
      const updatedCategory = await updateCategoryUseCase.execute({
        id: categoryId,
        name: name,
        description: description,
      });

      const response: TApiResponse<TUpdateCategoryOutput> = {
        status: StatusCodes.OK,
        body: {
          data: {
            id: updatedCategory.id,
            name: updatedCategory.name,
            description: updatedCategory.description,
          },
          message: 'Updated category successfully',
        },
      };

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error('Error while updating category:', error);

      const response: TApiError = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          data: null,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
      };

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    const { categoryId } = req.params;

    if (!categoryId) {
      const response: TApiError = {
        status: StatusCodes.BAD_REQUEST,
        body: {
          data: null,
          message: 'Please provide the category id',
        },
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
      const deletedCategory = await deleteCategoryUseCase.execute({
        id: categoryId,
      });

      const response: TApiResponse<TDeleteCategoryOutput> = {
        status: StatusCodes.OK,
        body: {
          data: {
            id: deletedCategory.id,
            name: deletedCategory.name,
            description: deletedCategory.description,
          },
          message: 'Deleted category successfully',
        },
      };

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error('Error while deleting category:', error);

      const response: TApiError = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          data: null,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
      };

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }
}
