import { z } from 'zod';
import { AuthorSchema, Author } from '../entities';

export const CreateAuthorSchema = AuthorSchema.omit({ id: true });
export type TCreateAuthorInput = z.infer<typeof CreateAuthorSchema>;
export type TCreateAuthorOutput = Author;

export type TFindAllAuthorsOutput = Author[];

export const FindAuthorByIdSchema = AuthorSchema.pick({ id: true });
export type TFindAuthorByIdInput = z.infer<typeof FindAuthorByIdSchema>;
export type TFindAuthorByIdOutput = Author | null;

export const FindAuthorByNameSchema = AuthorSchema.pick({ name: true });
export type TFindAuthorByNameInput = z.infer<typeof FindAuthorByNameSchema>;
export type TFindAuthorByNameOutput = Author | null;

export const UpdateAuthorSchema = AuthorSchema;
export type TUpdateAuthorInput = z.infer<typeof UpdateAuthorSchema>;
export type TUpdateAuthorOutput = Author;

export const DeleteAuthorSchema = AuthorSchema.pick({ id: true });
export type TDeleteAuthorInput = z.infer<typeof DeleteAuthorSchema>;
export type TDeleteAuthorOutput = Author;
