import z from "zod";
import { UserSchema } from "../generated-zod";

export const User = UserSchema.pick({
  id: true,
  username: true,
  email: true,
  role: true,
});

export type TUser = z.infer<typeof User>;

export const RegisterUserInputSchema = UserSchema.pick({
  username: true,
  email: true,
  password: true,
});

export const RegisterUserZodSchema = RegisterUserInputSchema.extend({
  username: z.string().min(8, "Username must be at least 8 characters"),
  email: z.string().email("Please provide a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must not exceed 30 characters"),
});

export type TRegisterUserInput = z.infer<typeof RegisterUserInputSchema>;

export type TRegisterUserOutput = {
  status: number;
  body: {
    data: TUser;
  };
  success: boolean;
  message: string;
};
