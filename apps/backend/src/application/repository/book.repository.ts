import {
  TCreateBookInput,
  TCreateBookOutput,
  TDeleteBookInput,
  TDeleteBookOutput,
  TFindAllBooksOutput,
  TFindBookByIdInput,
  TFindBookByIdOutput,
  TFindBookByNameInput,
  TFindBookByNameOutput,
  TFindBooksByAuthorIdInput,
  TFindBooksByAuthorIdOutput,
  TFindBooksByCategoryIdInput,
  TFindBooksByCategoryIdOutput,
  TUpdateBookInput,
  TUpdateBookOutput,
} from '@book-toshokan/libs/domain';

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
