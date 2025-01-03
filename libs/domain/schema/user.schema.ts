import { z } from 'zod';
import { UserSchema, User } from '../entities';

export const CreateUserSchema = UserSchema.pick({
  username: true,
  email: true,
  password: true,
  image: true,
});
export type TCreateUserInput = z.infer<typeof CreateUserSchema>;
export type TCreateUserOutput = Omit<User, 'password' | 'image'>;

export const FindUserByIdSchema = UserSchema.pick({ id: true });
export type TFindUserByIdInput = z.infer<typeof FindUserByIdSchema>;
export type TFindUserByIdOutput = Omit<User, 'password' | 'image'> | null;

export const FindUserByEmailSchema = UserSchema.pick({ email: true });
export type TFindUserByEmailInput = z.infer<typeof FindUserByEmailSchema>;
export type TFindUserByEmailOutput = Omit<User, 'image'> | null;

export const UpdateUserSchema = UserSchema.pick({
  id: true,
  username: true,
  email: true,
  password: true,
  image: true,
});
export type TUpdateUserInput = z.infer<typeof UpdateUserSchema>;
export type TUpdateUserOutput = Omit<User, 'password' | 'image'>;

export const DeleteUserSchema = UserSchema.pick({ id: true });
export type TDeleteUserInput = z.infer<typeof DeleteUserSchema>;
export type TDeleteUserOutput = Omit<User, 'password' | 'image'>;

export const LoginUserSchema = UserSchema.pick({
  email: true,
  password: true,
});
export type TLoginUserInput = z.infer<typeof LoginUserSchema>;
export type TLoginUserOutput = Omit<User, 'password' | 'image'> | null;

export type TLogoutUserOutput = Omit<User, 'password' | 'image'>;
