import { z } from 'zod';

export const AuthorSchema = z.object({
  id: z.string().cuid(),
  name: z.string().min(4, 'Name is required'),
  about: z.string(),
});

export type Author = z.infer<typeof AuthorSchema>;
