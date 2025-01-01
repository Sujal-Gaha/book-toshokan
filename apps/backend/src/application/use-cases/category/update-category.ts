import {
  AbstractCategoryRepository,
  TUpdateCategoryInput,
  TUpdateCategoryOutput,
} from '../../repository/category.repository';

export class UpdateCategoryUseCase {
  constructor(private categoryRepository: AbstractCategoryRepository) {}

  async execute(input: TUpdateCategoryInput): Promise<TUpdateCategoryOutput> {
    if (!input.id) {
      throw new Error('Category id is required');
    }

    const categoryExists = await this.categoryRepository.findCategoryById({
      id: input.id,
    });

    if (!categoryExists) {
      throw new Error(`Category with the id ${input.id} not found`);
    }

    if (!input.name) {
      throw new Error('New name must be provided');
    }

    if (!input.description) {
      throw new Error('New description must be provided');
    }

    return this.categoryRepository.updateCategory({
      id: input.id,
      name: input.name,
      description: input.description,
    });
  }
}
