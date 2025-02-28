import { CreateCategoryInput, CreateCategoryOutput } from '@book-toshokan/libs/domain';
import { AbstractCategoryRepository } from '../../repository/category.repository';

export class CreateCategoryUseCase {
  constructor(private categoryRepository: AbstractCategoryRepository) {}

  async execute(input: CreateCategoryInput): Promise<CreateCategoryOutput> {
    return this.categoryRepository.createCategory({
      name: input.name,
      description: input.description,
    });
  }
}
