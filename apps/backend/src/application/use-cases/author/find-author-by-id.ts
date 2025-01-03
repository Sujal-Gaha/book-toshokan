import { TFindAuthorByIdInput, TFindAuthorByIdOutput } from '@book-toshokan/libs/domain';
import { AbstractAuthorRepository } from '../../repository/author.repository';

export class FindAuthorByIdUseCase {
  constructor(public authorRepository: AbstractAuthorRepository) {}

  async execute(input: TFindAuthorByIdInput): Promise<TFindAuthorByIdOutput> {
    return this.authorRepository.findAuthorById({ id: input.id });
  }
}
