import { TFindAuthorByNameInput, TFindAuthorByNameOutput } from '@book-toshokan/libs/domain';
import { AbstractAuthorRepository } from '../../repository/author.repository';

export class FindAuthorByNameUseCase {
  constructor(public authorRepository: AbstractAuthorRepository) {}

  async execute(input: TFindAuthorByNameInput): Promise<TFindAuthorByNameOutput> {
    return this.authorRepository.findAuthorByName({ name: input.name });
  }
}
