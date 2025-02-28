import { z } from 'zod';
import { AuthorSchema } from '../entities';

export const CreateAuthorInputSchema = AuthorSchema.pick({ name: true, description: true });
export type CreateAuthorInput = z.infer<typeof CreateAuthorInputSchema>;

export const CreateAuthorOutputSchema = AuthorSchema.pick({
  id: true,
  name: true,
  description: true,
});
export type CreateAuthorOutput = z.infer<typeof CreateAuthorOutputSchema>;

export const FindAllAuthorInputSchema = z.object({
  name: z.string().optional(),
  pageInfo: z.object({ page: z.number(), perPage: z.number() }).optional(),
});

export type FindAllAuthorInput = z.infer<typeof FindAllAuthorInputSchema>;

export const FindAllAuthorOutputSchema = z.object({
  authors: z.array(
    AuthorSchema.pick({
      id: true,
      name: true,
      description: true,
    })
  ),
  pageInfo: z.object({
    currentPage: z.number(),
    perPage: z.number(),
    totalCount: z.number(),
    totalPages: z.number(),
  }),
});
export type FindAllAuthorOutput = z.infer<typeof FindAllAuthorOutputSchema>;

export const FindAuthorByIdInputSchema = AuthorSchema.pick({ id: true });
export type FindAuthorByIdInput = z.infer<typeof FindAuthorByIdInputSchema>;

export const FindAuthorByIdOutputSchema = AuthorSchema.pick({
  id: true,
  name: true,
  description: true,
});
export type FindAuthorByIdOutput = z.infer<typeof FindAuthorByIdOutputSchema>;

export const UpdateAuthorInputSchema = AuthorSchema.pick({
  id: true,
  name: true,
  description: true,
});
export type UpdateAuthorInput = z.infer<typeof UpdateAuthorInputSchema>;

export const UpdateAuthorOutputSchema = AuthorSchema.pick({
  id: true,
  name: true,
  description: true,
});
export type UpdateAuthorOutput = z.infer<typeof UpdateAuthorOutputSchema>;

export const DeleteAuthorInputSchema = AuthorSchema.pick({ id: true });
export type DeleteAuthorInput = z.infer<typeof DeleteAuthorInputSchema>;

export const DeleteAuthorOutputSchema = AuthorSchema.pick({
  id: true,
  name: true,
  description: true,
});
export type DeleteAuthorOutput = z.infer<typeof DeleteAuthorOutputSchema>;
