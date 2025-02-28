import { FindAllAuthorInput, FindAllAuthorOutput } from '@book-toshokan/libs/domain';
import { AbstractAuthorRepository } from '../../repository/author.repository';

export class FindAllAuthorsUseCase {
  constructor(public authorRepository: AbstractAuthorRepository) {}

  async execute(input: FindAllAuthorInput): Promise<FindAllAuthorOutput> {
    return this.authorRepository.findAllAuthor({
      name: input.name,
      pageInfo: {
        page: input.pageInfo.page,
        perPage: input.pageInfo.perPage,
      },
    });
  }
}
