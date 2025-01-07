import { z } from 'zod';
import { CategorySchema, Category } from '../entities';

export const CreateCategorySchema = CategorySchema.omit({ id: true });
export type TCreateCategoryInput = z.infer<typeof CreateCategorySchema>;
export type TCreateCategoryOutput = Category;

export type TFindAllCategoryInput = { name?: string };
export type TFindAllCategoryOutput = Category[];

export const FindCategoryByIdSchema = CategorySchema.pick({ id: true });
export type TFindCategoryByIdInput = z.infer<typeof FindCategoryByIdSchema>;
export type TFindCategoryByIdOutput = Category | null;

export const UpdateCategorySchema = CategorySchema;
export type TUpdateCategoryInput = z.infer<typeof UpdateCategorySchema>;
export type TUpdateCategoryOutput = Category;

export const DeleteCategorySchema = CategorySchema.pick({ id: true });
export type TDeleteCategoryInput = z.infer<typeof DeleteCategorySchema>;
export type TDeleteCategoryOutput = Category;
