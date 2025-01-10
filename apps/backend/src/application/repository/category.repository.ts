import {
  TCreateCategoryInput,
  TCreateCategoryOutput,
  TDeleteCategoryInput,
  TDeleteCategoryOutput,
  TFindAllCategoryInput,
  TFindAllCategoryOutput,
  TFindCategoryByIdInput,
  TFindCategoryByIdOutput,
  TUpdateCategoryInput,
  TUpdateCategoryOutput,
} from '@book-toshokan/libs/domain';

export abstract class AbstractCategoryRepository {
  abstract createCategory(input: TCreateCategoryInput): Promise<TCreateCategoryOutput>;
  abstract findAllCategory(input: TFindAllCategoryInput): Promise<TFindAllCategoryOutput>;
  abstract findCategoryById(input: TFindCategoryByIdInput): Promise<TFindCategoryByIdOutput>;
  abstract updateCategory(input: TUpdateCategoryInput): Promise<TUpdateCategoryOutput>;
  abstract deleteCategory(input: TDeleteCategoryInput): Promise<TDeleteCategoryOutput>;
}
