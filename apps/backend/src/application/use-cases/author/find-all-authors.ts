import { AbstractAuthorRepository, TFindAllAuthorsOutput } from '../../repository/author.repository';

export class FindAllAuthorsUseCase {
  constructor(public authorRepository: AbstractAuthorRepository) {}

  async execute(): Promise<TFindAllAuthorsOutput> {
    return this.authorRepository.findAllAuthors();
  }
}
