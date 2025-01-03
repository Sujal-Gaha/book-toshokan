import { User } from '../entities';

export type TCreateUserInput = Pick<User, 'username' | 'email' | 'password' | 'image'>;
export type TCreateUserOutput = Omit<User, 'password' | 'image'>;

export type TFindUserByIdInput = Pick<User, 'id'>;
export type TFindUserByIdOutput = Omit<User, 'password' | 'image'> | null;

export type TFindUserByEmailInput = Pick<User, 'email'>;
export type TFindUserByEmailOutput = Omit<User, 'image'> | null;

export type TUpdateUserInput = Pick<User, 'id' | 'username' | 'email' | 'password' | 'image'>;
export type TUpdateUserOutput = Omit<User, 'password' | 'image'>;

export type TDeleteUserInput = Pick<User, 'id'>;
export type TDeleteUserOutput = Omit<User, 'password' | 'image'>;

export type TLoginUserInput = Pick<User, 'email' | 'password'>;
export type TLoginUserOutput = Omit<User, 'password' | 'image'> | null;

export type TLogoutUserOutput = Omit<User, 'password' | 'image'>;
