import { Request, Response } from 'express';
import { CategoryRepository } from '../../infrastructure/database/category.repository.impl';
import { CreateCategoryUseCase } from '../../application/use-cases/category/create-category';
import { FindCategoryByIdUseCase } from '../../application/use-cases/category/find-category-by-id';
import { UpdateCategoryUseCase } from '../../application/use-cases/category/update-category';
import { DeleteCategoryUseCase } from '../../application/use-cases/category/delete-category';
import { FindAllCategoryUseCase } from '../../application/use-cases/category/find-all-category';

const categoryRepository = new CategoryRepository();

const createCategoryUseCase = new CreateCategoryUseCase(categoryRepository);
const findAllCategoryUseCase = new FindAllCategoryUseCase(categoryRepository);
const findCategoryByIdUseCase = new FindCategoryByIdUseCase(categoryRepository);
const updateCategoryUseCase = new UpdateCategoryUseCase(categoryRepository);
const deleteCategoryUseCase = new DeleteCategoryUseCase(categoryRepository);

export class CategoryController {
  static async createCategory(req: Request, res: Response) {
    const { name, description } = req.body;

    try {
      const category = await createCategoryUseCase.execute({
        name: name,
        description: description,
      });

      res.status(201).json(category);
    } catch (error) {
      console.log('error ', error);
      res.status(400).json({ error: error.message });
    }
  }

  static async findAllCategory(req: Request, res: Response) {
    try {
      const categories = await findAllCategoryUseCase.execute();
      res.status(200).json(categories);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async findCategoryById(req: Request, res: Response) {
    const { categoryId } = req.params;
    try {
      const categoryById = await findCategoryByIdUseCase.execute({
        id: categoryId,
      });
      res.status(200).json(categoryById);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateCategory(req: Request, res: Response) {
    const { categoryId } = req.params;
    const { name, description } = req.body;
    try {
      const updatedCategory = await updateCategoryUseCase.execute({
        id: categoryId,
        name: name,
        description: description,
      });
      res.status(200).json(updatedCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async deleteCategory(req: Request, res: Response) {
    const { categoryId } = req.params;
    try {
      const deletedCategory = await deleteCategoryUseCase.execute({
        id: categoryId,
      });

      res.status(200).json(deletedCategory);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
