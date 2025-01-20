import { z } from 'zod';
import { AuthorSchema, Author } from '../entities';

export const CreateAuthorSchema = AuthorSchema.omit({ id: true });
export type TCreateAuthorInput = z.infer<typeof CreateAuthorSchema>;
export type TCreateAuthorOutput = Author;

export type TFindAllAuthorInput = { name?: string; pageInfo?: { page: number; perPage: number } };
export type TFindAllAuthorOutput = {
  authors: Author[];
  pageInfo: {
    currentPage: number;
    perPage: number;
    totalCount: number;
    totalPages: number;
  };
};

export const FindAuthorByIdSchema = AuthorSchema.pick({ id: true });
export type TFindAuthorByIdInput = z.infer<typeof FindAuthorByIdSchema>;
export type TFindAuthorByIdOutput = Author | null;

export const UpdateAuthorSchema = AuthorSchema;
export type TUpdateAuthorInput = z.infer<typeof UpdateAuthorSchema>;
export type TUpdateAuthorOutput = Author;

export const DeleteAuthorSchema = AuthorSchema.pick({ id: true });
export type TDeleteAuthorInput = z.infer<typeof DeleteAuthorSchema>;
export type TDeleteAuthorOutput = Author;
