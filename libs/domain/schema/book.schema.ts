import { z } from 'zod';
import { Book, BookSchema } from '../entities';

export const CreateBookSchema = BookSchema.omit({ id: true });
export type TCreateBookInput = z.infer<typeof CreateBookSchema>;
export type TCreateBookOutput = Book;

export type TFindAllBooksOutput = Book;

export const FindBookByNameSchema = BookSchema.pick({ name: true });
export type TFindBookByNameInput = z.infer<typeof FindBookByNameSchema>;
export type TFindBookByNameOutput = Book | null;

export const FindBookByIdSchema = BookSchema.pick({ id: true }).extend({
  author: BookSchema.pick({ id: true, name: true }),
  category: BookSchema.pick({ id: true, name: true }),
});
export type TFindBookByIdInput = z.infer<typeof FindBookByIdSchema>;
export type TFindBookByIdOutput = Book | null;

export const FindBookByAuthorIdSchema = BookSchema.pick({ authorId: true });
export type TFindBooksByAuthorIdInput = z.infer<typeof FindBookByAuthorIdSchema>;
export type TFindBooksByAuthorIdOutput = Book | null;

export const FindBookByCategoryIdSchema = BookSchema.pick({ categoryId: true });
export type TFindBooksByCategoryIdInput = z.infer<typeof FindBookByCategoryIdSchema>;
export type TFindBooksByCategoryIdOutput = Book | null;

export const UpdateBookSchema = BookSchema;
export type TUpdateBookInput = z.infer<typeof UpdateBookSchema>;
export type TUpdateBookOutput = Book;

export const DeleteBookSchema = BookSchema.pick({ id: true });
export type TDeleteBookInput = z.infer<typeof DeleteBookSchema>;
export type TDeleteBookOutput = Book;
