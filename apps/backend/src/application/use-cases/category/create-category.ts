import {
  AbstractCategoryRepository,
  TCreateCategoryInput,
  TCreateCategoryOutput,
} from '../../repository/category.repository';

export class CreateCategoryUseCase {
  constructor(private categoryRepository: AbstractCategoryRepository) {}

  async execute(input: TCreateCategoryInput): Promise<TCreateCategoryOutput> {
    const categoryExist = await this.categoryRepository.findCategoryByName({
      name: input.name,
    });

    if (categoryExist) {
      throw new Error('Category already exist');
    }

    return this.categoryRepository.createCategory({
      name: input.name,
      description: input.description,
    });
  }
}
