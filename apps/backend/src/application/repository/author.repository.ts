import {
  TCreateAuthorInput,
  TCreateAuthorOutput,
  TDeleteAuthorInput,
  TDeleteAuthorOutput,
  TFindAllAuthorsOutput,
  TFindAuthorByIdInput,
  TFindAuthorByIdOutput,
  TFindAuthorByNameInput,
  TFindAuthorByNameOutput,
  TUpdateAuthorInput,
  TUpdateAuthorOutput,
} from '@book-toshokan/libs/domain';

export abstract class AbstractAuthorRepository {
  abstract createAuthor(input: TCreateAuthorInput): Promise<TCreateAuthorOutput>;
  abstract findAllAuthors(): Promise<TFindAllAuthorsOutput>;
  abstract findAuthorById(input: TFindAuthorByIdInput): Promise<TFindAuthorByIdOutput>;
  abstract findAuthorByName(input: TFindAuthorByNameInput): Promise<TFindAuthorByNameOutput>;
  abstract updateAuthor(input: TUpdateAuthorInput): Promise<TUpdateAuthorOutput>;
  abstract deleteAuthor(input: TDeleteAuthorInput): Promise<TDeleteAuthorOutput>;
}
