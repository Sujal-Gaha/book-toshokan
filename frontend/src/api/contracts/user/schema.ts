import z from "zod";

export const UserSchema = z.object({
  id: z.string(),
  username: z.string().min(8, "Username must be at least 8 characters"),
  email: z.string().email("Please provide a valid email"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(30, "Password must not exceed 30 characters"),
  role: z.enum(["USER", "ADMIN"]).optional(),
});

export const User = UserSchema.pick({
  id: true,
  username: true,
  email: true,
  role: true,
});

export type TUser = z.infer<typeof User>;

// Register User
export const RegisterUserSchema = UserSchema.pick({
  username: true,
  email: true,
  password: true,
});

export type TRegisterUserInput = z.infer<typeof RegisterUserSchema>;

export type TRegisterUserOutput = {
  status: number;
  body: {
    data: TUser;
    message: string;
  };
  success: boolean;
};

// Login User
export const LoginUserSchema = UserSchema.pick({
  email: true,
  password: true,
});

export type TLoginUserInput = z.infer<typeof LoginUserSchema>;

export type TLoginUserOutput = {
  status: number;
  body: {
    data: TUser;
    message: string;
  };
  success: boolean;
};

// Error
export type TError = {
  status: number;
  body: {
    data: null;
    message: string;
  };
  success: false;
};
