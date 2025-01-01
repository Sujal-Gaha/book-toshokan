import { AbstractCategoryRepository, TFindAllCategoryOutput } from '../../repository/category.repository';

export class FindAllCategoryUseCase {
  constructor(private categoryRepository: AbstractCategoryRepository) {}

  async execute(): Promise<TFindAllCategoryOutput> {
    return this.categoryRepository.findAllCategory();
  }
}
