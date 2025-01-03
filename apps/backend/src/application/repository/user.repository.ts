import { User } from '../../domain/entities/user.entity';

export type TCreateUserInput = Pick<User, 'username' | 'email' | 'password'>;
export type TCreateUserOutput = User;

export type TFindUserByIdInput = Pick<User, 'id'>;
export type TFindUserByIdOutput = User | null;

export type TFindUserByEmailInput = Pick<User, 'email'>;
export type TFindUserByEmailOutput = User | null;

export type TUpdateUserInput = Pick<User, 'id' | 'username' | 'email' | 'password' | 'image'>;
export type TUpdateUserOutput = User;

export type TDeleteUserInput = Pick<User, 'id'>;
export type TDeleteUserOutput = User;

export abstract class AbstractUserRepository {
  abstract createUser(input: TCreateUserInput): Promise<TCreateUserOutput>;
  abstract findUserById(input: TFindUserByIdInput): Promise<TFindUserByIdOutput>;
  abstract findUserByEmail(input: TFindUserByEmailInput): Promise<TFindUserByEmailOutput>;
  abstract updateUser(input: TUpdateUserInput): Promise<TUpdateUserOutput>;
  abstract deleteUser(input: TDeleteUserInput): Promise<TDeleteUserOutput>;
}
