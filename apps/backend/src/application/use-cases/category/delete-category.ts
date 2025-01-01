import {
  AbstractCategoryRepository,
  TDeleteCategoryInput,
  TDeleteCategoryOutput,
} from '../../repository/category.repository';

export class DeleteCategoryUseCase {
  constructor(private categoryRepository: AbstractCategoryRepository) {}

  async execute(input: TDeleteCategoryInput): Promise<TDeleteCategoryOutput> {
    if (!input.id) {
      throw new Error('Category id is required');
    }

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
