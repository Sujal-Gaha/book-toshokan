import { z } from 'zod';

export const CategorySchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(4, 'Name is required'),
  description: z.string().optional(),
});

export type Category = z.infer<typeof CategorySchema>;
