import { AbstractAuthorRepository, TDeleteAuthorInput, TDeleteAuthorOutput } from '../../repository/author.repository';

export class DeleteAuthorUseCase {
  constructor(public authorRepository: AbstractAuthorRepository) {}

  async execute(input: TDeleteAuthorInput): Promise<TDeleteAuthorOutput> {
    if (!input.id) {
      throw new Error('Author id is required');
    }

    const authorExist = await this.authorRepository.findAuthorById({
      id: input.id,
    });

    if (!authorExist) {
      throw new Error(`Author with the id ${input.id} not found`);
    }

    return this.authorRepository.deleteAuthor({
      id: input.id,
    });
  }
}
