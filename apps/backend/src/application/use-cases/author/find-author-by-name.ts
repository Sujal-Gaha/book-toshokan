import {
  AbstractAuthorRepository,
  TFindAuthorByNameInput,
  TFindAuthorByNameOutput,
} from '../../repository/author.repository';

export class FindAuthorByNameUseCase {
  constructor(public authorRepository: AbstractAuthorRepository) {}

  async execute(input: TFindAuthorByNameInput): Promise<TFindAuthorByNameOutput> {
    if (!input.name) {
      throw new Error('Author name is required');
    }

    return this.authorRepository.findAuthorByName({
      name: input.name,
    });
  }
}
