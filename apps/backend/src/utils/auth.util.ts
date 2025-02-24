import bcrypt from 'bcrypt';
import jwt, { JsonWebTokenError, TokenExpiredError } from 'jsonwebtoken';
import dotenv from 'dotenv';

dotenv.config();

export type TUserRole = 'admin' | 'user';

export type TTokenPayload = {
  id: string;
  username: string;
  email: string;
  role: TUserRole;
};

const hashPassword = async (password: string) => {
  const hashed = await bcrypt.hash(password, 10);
  return hashed;
};

const comparePassword = async (password: string, hashedPassword: string) => {
  const isCompared = await bcrypt.compare(password, hashedPassword);
  return isCompared;
};

const secretKey = process.env.TOKEN_KEY;

const generateToken = (payload: TTokenPayload) => {
  const token = jwt.sign(payload, secretKey, {
    expiresIn: 60 * 60, // 1 hour
  });
  return token;
};

const verifyToken = (token: string) => {
  try {
    const verified = jwt.verify(token, secretKey);
    return {
      isValid: true,
      message: 'token verified successfully',
      payload: verified,
    };
  } catch (error) {
    console.error(error);
    if (error instanceof TokenExpiredError) {
      return {
        isValid: false,
        message: error.message,
        payload: null,
      };
    } else if (error instanceof JsonWebTokenError) {
      return {
        isValid: false,
        message: error.message,
        payload: null,
      };
    }
    return {
      isValid: false,
      message: 'something went wrong when verifying token',
      payload: null,
    };
  }
};

export const authUtils = {
  hashPassword: hashPassword,
  comparePassword: comparePassword,
  generateToken: generateToken,
  verifyToken: verifyToken,
} as const;
