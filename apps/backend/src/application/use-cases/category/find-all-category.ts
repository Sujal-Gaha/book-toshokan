import { TFindAllCategoryOutput } from '@book-toshokan/libs/domain';
import { AbstractCategoryRepository } from '../../repository/category.repository';

export class FindAllCategoryUseCase {
  constructor(private categoryRepository: AbstractCategoryRepository) {}

  async execute(): Promise<TFindAllCategoryOutput> {
    return this.categoryRepository.findAllCategory();
  }
}
