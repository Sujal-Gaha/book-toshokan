import { TUpdateCategoryInput, TUpdateCategoryOutput } from '@book-toshokan/libs/domain';
import { AbstractCategoryRepository } from '../../repository/category.repository';

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: AbstractCategoryRepository) {}

  async execute(input: TUpdateCategoryInput): Promise<TUpdateCategoryOutput> {
    const categoryExists = await this.categoryRepository.findCategoryById({
      id: input.id,
    });

    if (!categoryExists) {
      throw new Error(`Category with the id ${input.id} not found`);
    }

    return this.categoryRepository.updateCategory({
      id: input.id,
      name: input.name,
      description: input.description,
    });
  }
}
