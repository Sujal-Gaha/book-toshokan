import { TFindCategoryByIdInput, TFindCategoryByIdOutput } from '@book-toshokan/libs/domain';
import { AbstractCategoryRepository } from '../../repository/category.repository';

export class FindCategoryByIdUseCase {
  constructor(private categoryRepository: AbstractCategoryRepository) {}

  async execute(input: TFindCategoryByIdInput): Promise<TFindCategoryByIdOutput> {
    if (!input.id) {
      throw new Error('Category id is required');
    }

    return this.categoryRepository.findCategoryById({
      id: input.id,
    });
  }
}
