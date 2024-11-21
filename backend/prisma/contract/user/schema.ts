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

export type TRegisterUserInput = z.infer<typeof RegisterUserInputSchema>;

export type TRegisterUserOutput = {
  status: number;
  body: {
    data: TUser;
  };
  success: boolean;
  message: string;
};
