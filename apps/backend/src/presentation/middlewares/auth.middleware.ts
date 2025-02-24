import { NextFunction, Request, Response } from 'express';
import { utils } from '../../utils';
import { TTokenPayload } from '../../utils/auth.util';
import { StatusCodes } from 'http-status-codes';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Express {
    interface Request {
      user: TTokenPayload;
    }
  }
}

export async function checkAuth(req: Request, res: Response, next: NextFunction) {
  const cookies = req.cookies;
  const token = (cookies?.token as string) || '';

  if (!cookies) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Cookie not found or is invalid',
      isSuccess: false,
      data: null,
    });
    return;
  }

  if (!token) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Token not found or is invalid',
      isSuccess: false,
      data: null,
    });
    return;
  }

  const verifyTokenOutput = utils.authUtils.verifyToken(token);

  if (!verifyTokenOutput.isValid) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: verifyTokenOutput.message,
      isSuccess: false,
      data: null,
    });
    return;
  }

  if (!verifyTokenOutput.payload) {
    res.status(StatusCodes.UNAUTHORIZED).json({
      message: 'Invalid token',
      isSucces: false,
      data: null,
    });
    return;
  }

  const payload = verifyTokenOutput.payload as TTokenPayload;

  req.user = {
    id: payload.id,
    username: payload.username,
    email: payload.email,
    role: payload.role,
  };

  next();
}

export const checkAdmin = async (req: Request, res: Response, next: NextFunction) => {
  if (req.user.role !== 'admin') {
    res.status(StatusCodes.FORBIDDEN).json({
      message: 'Unauthorized: Not a Admin',
      isSuccess: false,
      data: null,
    });
    return;
  }
  next();
};
