import {
  CreateAuthorInput,
  CreateAuthorOutput,
  DeleteAuthorInput,
  DeleteAuthorOutput,
  FindAllAuthorInput,
  FindAllAuthorOutput,
  FindAuthorByIdInput,
  FindAuthorByIdOutput,
  UpdateAuthorInput,
  UpdateAuthorOutput,
} from '@book-toshokan/libs/domain';

export abstract class AbstractAuthorRepository {
  abstract createAuthor(input: CreateAuthorInput): Promise<CreateAuthorOutput>;
  abstract findAllAuthor(input: FindAllAuthorInput): Promise<FindAllAuthorOutput>;
  abstract findAuthorById(input: FindAuthorByIdInput): Promise<FindAuthorByIdOutput>;
  abstract updateAuthor(input: UpdateAuthorInput): Promise<UpdateAuthorOutput>;
  abstract deleteAuthor(input: DeleteAuthorInput): Promise<DeleteAuthorOutput>;
}
