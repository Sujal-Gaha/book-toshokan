import { Book } from '../../domain/entities/book.entity';

export type TCreateBookInput = Omit<Book, 'id' | 'readStatus'>;
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

export abstract class AbstractBookRepository {
  abstract createBook(input: TCreateBookInput): Promise<TCreateBookOutput>;
  abstract findAllBooks(): Promise<TFindAllBooksOutput>;
  abstract findBookByName(input: TFindBookByNameInput): Promise<TFindBookByNameOutput>;
  abstract findBookById(input: TFindBookByIdInput): Promise<TFindBookByIdOutput>;
  abstract findBooksByAuthorId(input: TFindBooksByAuthorIdInput): Promise<TFindBooksByAuthorIdOutput>;
  abstract findBooksByCategoryId(input: TFindBooksByCategoryIdInput): Promise<TFindBooksByCategoryIdOutput>;
  abstract updateBook(input: TUpdateBookInput): Promise<TUpdateBookOutput>;
  abstract deleteBook(input: TDeleteBookInput): Promise<TDeleteBookOutput>;
}
