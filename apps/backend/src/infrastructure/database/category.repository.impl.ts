import {
  AbstractCategoryRepository,
  TCreateCategoryInput,
  TCreateCategoryOutput,
  TDeleteCategoryInput,
  TDeleteCategoryOutput,
  TFindCategoryByIdInput,
  TFindCategoryByNameInput,
  TFindCategoryByNameOutput,
  TUpdateCategoryInput,
  TUpdateCategoryOutput,
} from '../../application/repository/category.repository';
import { db } from '../../db';

export class CategoryRepository implements AbstractCategoryRepository {
  async createCategory(input: TCreateCategoryInput): Promise<TCreateCategoryOutput> {
    const category = await db.category.create({
      data: {
        name: input.name,
        description: input.description,
      },
    });

    return {
      data: {
        id: category.id,
        name: category.name,
        description: category.description,
      },
    };
  }

  async findCategoryById(input: TFindCategoryByIdInput): Promise<TCreateCategoryOutput> {
    const categoryById = await db.category.findFirst({
      where: {
        id: input.id,
      },
    });

    return {
      data: {
        id: categoryById.id,
        name: categoryById.name,
        description: categoryById.description,
      },
    };
  }

  async findCategoryByName(input: TFindCategoryByNameInput): Promise<TFindCategoryByNameOutput> {
    const categoryByName = await db.category.findFirst({
      where: {
        name: input.name,
      },
    });

    return {
      data: {
        id: categoryByName.id,
        name: categoryByName.name,
        description: categoryByName.description,
      },
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
      data: {
        id: updatedCategory.id,
        name: updatedCategory.name,
        description: updatedCategory.description,
      },
    };
  }

  async deleteCategory(input: TDeleteCategoryInput): Promise<TDeleteCategoryOutput> {
    const deletedCategory = await db.category.delete({
      where: {
        id: input.id,
      },
    });

    return {
      data: {
        id: deletedCategory.id,
        name: deletedCategory.name,
        description: deletedCategory.description,
      },
    };
  }
}
