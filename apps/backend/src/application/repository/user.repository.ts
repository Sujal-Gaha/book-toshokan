import { User } from '../../domain/entities/user.entity';

export type TCreateUserInput = Pick<User, 'username' | 'email' | 'password'>;
export type TCreateUserOutput = { data: User };

export type TFindUserByIdInput = Pick<User, 'id'>;
export type TFindUserByIdOutput = { data: User | null };

export type TFindUserByEmailInput = Pick<User, 'email'>;
export type TFindUserByEmailOutput = { data: User | null };

export type TUpdateUserInput = Pick<User, 'id' | 'username' | 'email' | 'password' | 'image'>;
export type TUpdateUserOutput = { data: User };

export type TDeleteUserInput = Pick<User, 'id'>;
export type TDeleteUserOutput = { data: User };

export abstract class AbstractUserRepository {
  abstract createUser(input: TCreateUserInput): Promise<TCreateUserOutput>;
  abstract findUserById(input: TFindUserByIdInput): Promise<TFindUserByIdOutput>;
  abstract findUserByEmail(input: TFindUserByEmailInput): Promise<TFindUserByEmailOutput>;
  abstract updateUser(input: TUpdateUserInput): Promise<TUpdateUserOutput>;
  abstract deleteUser(input: TDeleteUserInput): Promise<TDeleteUserOutput>;
}
