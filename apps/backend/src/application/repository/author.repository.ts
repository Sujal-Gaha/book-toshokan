import {
  TCreateAuthorInput,
  TCreateAuthorOutput,
  TDeleteAuthorInput,
  TDeleteAuthorOutput,
  TFindAllAuthorInput,
  TFindAllAuthorOutput,
  TFindAuthorByIdInput,
  TFindAuthorByIdOutput,
  TUpdateAuthorInput,
  TUpdateAuthorOutput,
} from '@book-toshokan/libs/domain';

export abstract class AbstractAuthorRepository {
  abstract createAuthor(input: TCreateAuthorInput): Promise<TCreateAuthorOutput>;
  abstract findAllAuthor(input: TFindAllAuthorInput): Promise<TFindAllAuthorOutput>;
  abstract findAuthorById(input: TFindAuthorByIdInput): Promise<TFindAuthorByIdOutput>;
  abstract updateAuthor(input: TUpdateAuthorInput): Promise<TUpdateAuthorOutput>;
  abstract deleteAuthor(input: TDeleteAuthorInput): Promise<TDeleteAuthorOutput>;
}
