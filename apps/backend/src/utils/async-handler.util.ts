import { NextFunction, Request, Response } from 'express';
import { handleError } from './error-handler.util';

export const asyncHandler =
  // eslint-disable-next-line @typescript-eslint/no-unsafe-function-type
  (fn: Function) => (req: Request, res: Response, next: NextFunction) => {
    Promise.resolve(fn(req, res, next)).catch((error) =>
      handleError({
        res,
        error,
      })
    );
  };
