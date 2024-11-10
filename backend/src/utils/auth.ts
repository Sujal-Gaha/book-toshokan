import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const TOKEN_KEY = process.env.TOKEN_KEY || "";

export const createSecretToken = (id: string) => {
  return jwt.sign({ id }, TOKEN_KEY, {
    expiresIn: 3 * 24 * 60 * 60,
  });
};

export const hashPassword = async (password: string, salt: number) => {
  const hashed = await bcrypt.hash(password, salt);
  return hashed;
};

export const comparePassword = async (
  password: string,
  hashedPassword: string
) => {
  const isCompared = await bcrypt.compare(password, hashedPassword);
  return isCompared;
};
