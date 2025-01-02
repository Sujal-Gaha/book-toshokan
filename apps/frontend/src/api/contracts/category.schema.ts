import z from 'zod';

export const CategorySchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
});

export type TCategory = z.infer<typeof CategorySchema>;

export const CreateCategorySchema = CategorySchema.pick({
  name: true,
  description: true,
});

export type TCreateCategoryInput = z.infer<typeof CreateCategorySchema>;

export type TCreateCategoryOutput = { status: number; body: { data: TCategory; message: string } };
