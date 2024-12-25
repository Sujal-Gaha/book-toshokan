import {
  AbstractAuthorRepository,
  TFindAuthorByIdInput,
  TFindAuthorByIdOutput,
} from '../../repository/author.repository';

export class FindAuthorByIdUseCase {
  constructor(public authorRepository: AbstractAuthorRepository) {}

  async execute(input: TFindAuthorByIdInput): Promise<TFindAuthorByIdOutput> {
    if (!input.id) {
      throw new Error('Author id is required');
    }

    return this.authorRepository.findAuthorById({
      id: input.id,
    });
  }
}
