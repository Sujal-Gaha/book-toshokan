import { TCreateAuthorInput, TCreateAuthorOutput } from '@book-toshokan/libs/domain';
import { AbstractAuthorRepository } from '../../repository/author.repository';

export class CreateAuthorUseCase {
  constructor(private authorRepository: AbstractAuthorRepository) {}

  async execute(input: TCreateAuthorInput): Promise<TCreateAuthorOutput> {
    const authorExist = await this.authorRepository.findAuthorByName({
      name: input.name,
    });

    if (authorExist) {
      throw new Error('Author already exists');
    }

    return this.authorRepository.createAuthor(input);
  }
}
