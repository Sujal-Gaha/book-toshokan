import {
  CreateCategoryInput,
  CreateCategoryOutput,
  DeleteCategoryInput,
  DeleteCategoryOutput,
  FindAllCategoryInput,
  FindAllCategoryOutput,
  FindCategoryByIdInput,
  FindCategoryByIdOutput,
  UpdateCategoryInput,
  UpdateCategoryOutput,
} from '@book-toshokan/libs/domain';

export abstract class AbstractCategoryRepository {
  abstract createCategory(input: CreateCategoryInput): Promise<CreateCategoryOutput>;
  abstract findAllCategory(input: FindAllCategoryInput): Promise<FindAllCategoryOutput>;
  abstract findCategoryById(input: FindCategoryByIdInput): Promise<FindCategoryByIdOutput>;
  abstract updateCategory(input: UpdateCategoryInput): Promise<UpdateCategoryOutput>;
  abstract deleteCategory(input: DeleteCategoryInput): Promise<DeleteCategoryOutput>;
}
