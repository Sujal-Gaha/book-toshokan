import jwt, { JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv";
import bcrypt from "bcrypt";

dotenv.config();

const TOKEN_KEY = process.env.TOKEN_KEY || "";

if (!TOKEN_KEY) {
  throw new Error("TOKEN_KEY is missing from environment variables.");
}

export type TJwtPayload = string | JwtPayload;

export const generateRefreshToken = (id: TJwtPayload) => {
  return jwt.sign({ id }, TOKEN_KEY, {
    expiresIn: "3d", // 3 days
  });
};

export const generateAccessToken = (id: string) => {
  return jwt.sign({ id }, TOKEN_KEY, {
    expiresIn: "1d", // 1 day
  });
};

export const hashPassword = async (password: string, saltRounds: number) => {
  const salt = await bcrypt.genSalt(saltRounds);
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

export const verifyToken = (token: string) => {
  if (!token) {
    throw new Error("JWT must be provided");
  }

  try {
    const decoded = jwt.verify(token, TOKEN_KEY);
    return decoded;
  } catch (error) {
    throw new Error("Invalid token");
  }
};
