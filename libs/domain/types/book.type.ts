import { Book } from '../entities';

export type TCreateBookInput = Omit<Book, 'id'>;
export type TCreateBookOutput = { data: Book };

export type TFindAllBooksOutput = { data: Book };

export type TFindBookByNameInput = Pick<Book, 'name'>;
export type TFindBookByNameOutput = { data: Book | null };

export type TFindBookByIdInput = Pick<Book, 'id'>;
export type TFindBookByIdOutput = { data: Book | null };

export type TFindBooksByAuthorIdInput = Pick<Book, 'authorId'>;
export type TFindBooksByAuthorIdOutput = { data: Book | null };

export type TFindBooksByCategoryIdInput = Pick<Book, 'categoryId'>;
export type TFindBooksByCategoryIdOutput = { data: Book | null };

export type TUpdateBookInput = Book;
export type TUpdateBookOutput = { data: Book };

export type TDeleteBookInput = Pick<Book, 'id'>;
export type TDeleteBookOutput = { data: Book };
