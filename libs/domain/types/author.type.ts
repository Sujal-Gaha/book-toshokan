import { Author } from '../entities';

export type TCreateAuthorInput = Pick<Author, 'name' | 'about'>;
export type TCreateAuthorOutput = Author;

export type TFindAllAuthorsOutput = Author[];

export type TFindAuthorByIdInput = Pick<Author, 'id'>;
export type TFindAuthorByIdOutput = Author | null;

export type TFindAuthorByNameInput = Pick<Author, 'name'>;
export type TFindAuthorByNameOutput = Author | null;

export type TUpdateAuthorInput = Author;
export type TUpdateAuthorOutput = Author;

export type TDeleteAuthorInput = Pick<Author, 'id'>;
export type TDeleteAuthorOutput = Author;
