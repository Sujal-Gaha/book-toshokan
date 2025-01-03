import { Category } from '../entities';

export type TCreateCategoryInput = Pick<Category, 'name' | 'description'>;
export type TCreateCategoryOutput = Category;

export type TFindAllCategoryOutput = Category[];

export type TFindCategoryByIdInput = Pick<Category, 'id'>;
export type TFindCategoryByIdOutput = Category | null;

export type TUpdateCategoryInput = Category;
export type TUpdateCategoryOutput = Category;

export type TDeleteCategoryInput = Pick<Category, 'id'>;
export type TDeleteCategoryOutput = Category;
