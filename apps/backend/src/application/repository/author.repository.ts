import { Author } from '../../domain/entities/author.entity';

export type TCreateAuthorInput = Pick<Author, 'name' | 'about'>;
export type TCreateAuthorOutput = { data: Author };

export type TFindAllAuthorsOutput = { data: Author[] };

export type TFindAuthorByIdInput = Pick<Author, 'id'>;
export type TFindAuthorByIdOutput = { data: Author | null };

export type TFindAuthorByNameInput = Pick<Author, 'name'>;
export type TFindAuthorByNameOutput = { data: Author | null };

export type TUpdateAuthorInput = Author;
export type TUpdateAuthorOutput = { data: Author };

export type TDeleteAuthorInput = Pick<Author, 'id'>;
export type TDeleteAuthorOutput = { data: Author };

export abstract class AbstractAuthorRepository {
  abstract createAuthor(input: TCreateAuthorInput): Promise<TCreateAuthorOutput>;
  abstract findAllAuthors(): Promise<TFindAllAuthorsOutput>;
  abstract findAuthorById(input: TFindAuthorByIdInput): Promise<TFindAuthorByIdOutput>;
  abstract findAuthorByName(input: TFindAuthorByNameInput): Promise<TFindAuthorByNameOutput>;
  abstract updateAuthor(input: TUpdateAuthorInput): Promise<TUpdateAuthorOutput>;
  abstract deleteAuthor(input: TDeleteAuthorInput): Promise<TDeleteAuthorOutput>;
}
