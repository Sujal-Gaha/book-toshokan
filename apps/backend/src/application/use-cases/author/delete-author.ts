import { DeleteAuthorInput, DeleteAuthorOutput } from '@book-toshokan/libs/domain';
import { AbstractAuthorRepository } from '../../repository/author.repository';

export class DeleteAuthorUseCase {
  constructor(public authorRepository: AbstractAuthorRepository) {}

  async execute(input: DeleteAuthorInput): Promise<DeleteAuthorOutput> {
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
