import {
  TCreateCategoryInput,
  TCreateCategoryOutput,
  TDeleteCategoryInput,
  TDeleteCategoryOutput,
  TFindAllCategoryInput,
  TFindAllCategoryOutput,
  TFindCategoryByIdInput,
  TFindCategoryByIdOutput,
  TUpdateCategoryInput,
  TUpdateCategoryOutput,
} from '@book-toshokan/libs/domain';
import { AbstractCategoryRepository } from '../../application/repository/category.repository';
import { db } from '@book-toshokan/libs/backend-db';

export class CategoryRepository implements AbstractCategoryRepository {
  async createCategory(input: TCreateCategoryInput): Promise<TCreateCategoryOutput> {
    const category = await db.category.create({
      data: {
        name: input.name,
        description: input.description,
      },
    });

    return {
      id: category.id,
      name: category.name,
      description: category.description,
    };
  }

  async findAllCategory(input: TFindAllCategoryInput): Promise<TFindAllCategoryOutput> {
    const categories = await db.category.findMany({
      ...(input.name && {
        where: {
          name: {
            contains: input.name,
            mode: 'insensitive',
          },
        },
      }),
    });

    return categories.map((category) => ({
      id: category.id,
      name: category.name,
      description: category.description,
    }));
  }

  async findCategoryById(input: TFindCategoryByIdInput): Promise<TFindCategoryByIdOutput> {
    const categoryById = await db.category.findFirst({
      where: {
        id: input.id,
      },
    });

    return {
      id: categoryById.id,
      name: categoryById.name,
      description: categoryById.description,
    };
  }

  async updateCategory(input: TUpdateCategoryInput): Promise<TUpdateCategoryOutput> {
    const updatedCategory = await db.category.update({
      where: {
        id: input.id,
      },
      data: {
        name: input.name,
        description: input.description,
      },
    });

    return {
      id: updatedCategory.id,
      name: updatedCategory.name,
      description: updatedCategory.description,
    };
  }

  async deleteCategory(input: TDeleteCategoryInput): Promise<TDeleteCategoryOutput> {
    const deletedCategory = await db.category.delete({
      where: {
        id: input.id,
      },
    });

    return {
      id: deletedCategory.id,
      name: deletedCategory.name,
      description: deletedCategory.description,
    };
  }
}
