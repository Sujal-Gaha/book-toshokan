import { z } from 'zod';

export enum UserRoleEnum {
  USER = 'USER',
  ADMIN = 'ADMIN',
}

export const UserRoleEnumSchema = z.nativeEnum(UserRoleEnum);

export type TUserRoleEnum = z.infer<typeof UserRoleEnumSchema>;

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(8, 'Username must be at least 8 characters'),
  email: z.string().email('Please provide a valid email'),
  password: z
    .string()
    .min(8, 'Password must be at least 8 characters')
    .max(30, 'Password must not exceed 30 characters'),
  image: z.string().optional(),
  role: z.enum(['USER', 'ADMIN']).optional().default(UserRoleEnum.USER),
});

export type User = z.infer<typeof UserSchema>;
