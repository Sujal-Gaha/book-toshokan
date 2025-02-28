import { z } from 'zod';
import { CategorySchema } from '../entities';

export const CreateCategoryInputSchema = CategorySchema.pick({ name: true, description: true });
export type CreateCategoryInput = z.infer<typeof CreateCategoryInputSchema>;

export const CreateCategoryOutputSchema = CategorySchema.pick({ id: true, name: true, description: true });
export type CreateCategoryOutput = z.infer<typeof CreateCategoryOutputSchema>;

export const FindAllCategoryInputSchema = z.object({
  name: z.string().optional(),
  pageInfo: z.object({ page: z.number(), perPage: z.number() }).optional(),
});
export type FindAllCategoryInput = z.infer<typeof FindAllCategoryInputSchema>;

export const FindAllCategoryOutputSchema = z.object({
  categories: z.array(CategorySchema.pick({ id: true, name: true, description: true })),
  pageInfo: z.object({
    currentPage: z.number(),
    perPage: z.number(),
    totalCount: z.number(),
    totalPages: z.number(),
  }),
});
export type FindAllCategoryOutput = z.infer<typeof FindAllCategoryOutputSchema>;

export const FindCategoryByIdInputSchema = CategorySchema.pick({ id: true });
export type FindCategoryByIdInput = z.infer<typeof FindCategoryByIdInputSchema>;

export const FindCategoryByIdOutputSchema = CategorySchema.pick({ id: true, name: true, description: true });
export type FindCategoryByIdOutput = z.infer<typeof FindCategoryByIdOutputSchema>;

export const UpdateCategoryInputSchema = CategorySchema.pick({ id: true, name: true, description: true });
export type UpdateCategoryInput = z.infer<typeof UpdateCategoryInputSchema>;

export const UpdateCategoryOutputSchema = CategorySchema.pick({ id: true, name: true, description: true });
export type UpdateCategoryOutput = z.infer<typeof UpdateCategoryOutputSchema>;

export const DeleteCategoryInputSchema = CategorySchema.pick({ id: true });
export type DeleteCategoryInput = z.infer<typeof DeleteCategoryInputSchema>;

export const DeleteCategoryOutputSchema = CategorySchema.pick({ id: true, name: true, description: true });
export type DeleteCategoryOutput = z.infer<typeof DeleteCategoryOutputSchema>;
