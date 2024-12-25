import { AbstractAuthorRepository, TUpdateAuthorInput, TUpdateAuthorOutput } from '../../repository/author.repository';

export class UpdateAuthorUseCase {
  constructor(public authorRepository: AbstractAuthorRepository) {}

  async execute(input: TUpdateAuthorInput): Promise<TUpdateAuthorOutput> {
    if (!input.id) {
      throw new Error('Author id is required');
    }

    const authorExist = await this.authorRepository.findAuthorById({
      id: input.id,
    });

    if (!authorExist) {
      throw new Error('Author doesnot exist');
    }

    return this.authorRepository.updateAuthor({
      id: input.id,
      name: input.name,
      about: input.about,
    });
  }
}
