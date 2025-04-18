import { FindAllCategoryInput, FindAllCategoryOutput } from '@book-toshokan/libs/domain';
import { AbstractCategoryRepository } from '../../repository/category.repository';

export class FindAllCategoryUseCase {
  constructor(private categoryRepository: AbstractCategoryRepository) {}

  async execute(input: FindAllCategoryInput): Promise<FindAllCategoryOutput> {
    return this.categoryRepository.findAllCategory({
      name: input.name,
      pageInfo: {
        page: input.pageInfo.page,
        perPage: input.pageInfo.perPage,
      },
    });
  }
}
