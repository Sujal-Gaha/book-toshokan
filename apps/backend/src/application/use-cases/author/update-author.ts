import { TUpdateAuthorInput, TUpdateAuthorOutput } from '@book-toshokan/libs/domain';
import { AbstractAuthorRepository } from '../../repository/author.repository';

export class UpdateAuthorUseCase {
  constructor(public authorRepository: AbstractAuthorRepository) {}

  async execute(input: TUpdateAuthorInput): Promise<TUpdateAuthorOutput> {
    const authorExist = await this.authorRepository.findAuthorById({
      id: input.id,
    });

    if (!authorExist) {
      throw new Error('Author doesnot exist');
    }

    return this.authorRepository.updateAuthor({
      id: input.id,
      name: input.name,
      description: input.description,
    });
  }
}
