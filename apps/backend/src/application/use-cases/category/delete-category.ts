import { DeleteCategoryInput, DeleteCategoryOutput } from '@book-toshokan/libs/domain';
import { AbstractCategoryRepository } from '../../repository/category.repository';

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: AbstractCategoryRepository) {}

  async execute(input: DeleteCategoryInput): Promise<DeleteCategoryOutput> {
    const categoryExists = await this.categoryRepository.findCategoryById({
      id: input.id,
    });

    if (!categoryExists) {
      throw new Error(`Category with the id ${input.id} not found`);
    }

    return this.categoryRepository.deleteCategory({
      id: input.id,
    });
  }
}
