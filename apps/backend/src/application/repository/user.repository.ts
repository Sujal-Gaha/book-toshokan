import {
  TCreateUserInput,
  TCreateUserOutput,
  TDeleteUserInput,
  TDeleteUserOutput,
  TFindUserByEmailInput,
  TFindUserByEmailOutput,
  TFindUserByIdInput,
  TFindUserByIdOutput,
  TUpdateUserInput,
  TUpdateUserOutput,
} from '@book-toshokan/libs/domain';

export abstract class AbstractUserRepository {
  abstract createUser(input: TCreateUserInput): Promise<TCreateUserOutput>;
  abstract findUserById(input: TFindUserByIdInput): Promise<TFindUserByIdOutput>;
  abstract findUserByEmail(input: TFindUserByEmailInput): Promise<TFindUserByEmailOutput>;
  abstract updateUser(input: TUpdateUserInput): Promise<TUpdateUserOutput>;
  abstract deleteUser(input: TDeleteUserInput): Promise<TDeleteUserOutput>;
}
