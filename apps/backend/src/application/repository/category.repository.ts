import { Category } from '../../domain/entities/category.entity';

export type TCreateCategoryInput = Pick<Category, 'name' | 'description'>;
export type TCreateCategoryOutput = { data: Category };

export type TFindAllCategoryOutput = { data: Category[] };

export type TFindCategoryByIdInput = Pick<Category, 'id'>;
export type TFindCategoryByIdOutput = { data: Category | null };

export type TUpdateCategoryInput = Category;
export type TUpdateCategoryOutput = { data: Category };

export type TDeleteCategoryInput = Pick<Category, 'id'>;
export type TDeleteCategoryOutput = { data: Category };

export abstract class AbstractCategoryRepository {
  abstract createCategory(input: TCreateCategoryInput): Promise<TCreateCategoryOutput>;
  abstract findAllCategory(): Promise<TFindAllCategoryOutput>;
  abstract findCategoryById(input: TFindCategoryByIdInput): Promise<TFindCategoryByIdOutput>;
  abstract updateCategory(input: TUpdateCategoryInput): Promise<TUpdateCategoryOutput>;
  abstract deleteCategory(input: TDeleteCategoryInput): Promise<TDeleteCategoryOutput>;
}
