import { CreateAuthorInput, CreateAuthorOutput } from '@book-toshokan/libs/domain';
import { AbstractAuthorRepository } from '../../repository/author.repository';

export class CreateAuthorUseCase {
  constructor(private authorRepository: AbstractAuthorRepository) {}

  async execute(input: CreateAuthorInput): Promise<CreateAuthorOutput> {
    return this.authorRepository.createAuthor({
      name: input.name,
      description: input.description,
    });
  }
}
