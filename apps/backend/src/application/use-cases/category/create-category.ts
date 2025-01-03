import { TCreateCategoryInput, TCreateCategoryOutput } from '@book-toshokan/libs/domain';
import { AbstractCategoryRepository } from '../../repository/category.repository';

export class CreateCategoryUseCase {
  constructor(private categoryRepository: AbstractCategoryRepository) {}

  async execute(input: TCreateCategoryInput): Promise<TCreateCategoryOutput> {
    return this.categoryRepository.createCategory({
      name: input.name,
      description: input.description,
    });
  }
}
