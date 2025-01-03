import { TFindAllAuthorsOutput } from '@book-toshokan/libs/domain';
import { AbstractAuthorRepository } from '../../repository/author.repository';

export class FindAllAuthorsUseCase {
  constructor(public authorRepository: AbstractAuthorRepository) {}

  async execute(): Promise<TFindAllAuthorsOutput> {
    return this.authorRepository.findAllAuthors();
  }
}
