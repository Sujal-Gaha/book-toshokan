import { FindAuthorByIdInput, FindAuthorByIdOutput } from '@book-toshokan/libs/domain';
import { AbstractAuthorRepository } from '../../repository/author.repository';

export class FindAuthorByIdUseCase {
  constructor(public authorRepository: AbstractAuthorRepository) {}

  async execute(input: FindAuthorByIdInput): Promise<FindAuthorByIdOutput> {
    return this.authorRepository.findAuthorById({ id: input.id });
  }
}
