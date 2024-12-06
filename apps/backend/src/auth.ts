import { NextFunction, Request, Response } from 'express';
import {
  verifyToken,
  generateRefreshToken,
  generateAccessToken,
} from './utils';

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken = req.headers['authorization'];
  const refreshToken = req.cookies['refreshToken'];

  if (!accessToken || !refreshToken) {
    res.status(401).json({
      status: 401,
      body: {
        data: null,
      },
      success: false,
      message: 'Access denied. No access token or refresh token provided.',
    });
    return;
  }

  try {
    const accessDecoded = verifyToken(accessToken);
    let refreshDecoded = verifyToken(refreshToken);

    if (!refreshDecoded) {
      const newRefreshToken = generateRefreshToken(accessDecoded);
      res.cookie('refreshToken', newRefreshToken, {
        httpOnly: true,
        secure: true,
      });
      refreshDecoded = verifyToken(newRefreshToken);
    }

    if (accessDecoded && refreshDecoded) {
      return next();
    } else {
      res.status(401).json({
        status: 401,
        body: {
          data: null,
        },
        success: false,
        message: 'Access denied. Invalid access token or refresh token.',
      });
      return;
    }
  } catch (error) {
    res.status(401).json({
      status: 401,
      body: {
        data: null,
      },
      success: false,
      message: 'Access denied. Invalid token(s).',
    });
    return;
  }
};

// export const validateTokens = async (req: Request, res: Response) => {
//   const accessToken = req.headers['authorization'];
//   const refreshToken = req.cookies['refreshToken'];

//   if (!accessToken || !refreshToken) {
//     return res.status(401).json({
//       status: 401,
//       body: { data: null },
//       success: false,
//       message: 'No tokens provided',
//     });
//   }

//   const { userId } = req.params;

//   try {
//     const accessDecoded = verifyToken(accessToken);
//     if (accessDecoded) {
//       return res
//         .status(200)
//         .json({ success: true, message: 'Tokens are valid' });
//     } else {
//       const refreshDecoded = verifyToken(refreshToken);
//       if (refreshDecoded) {
//         const newAccessToken = generateAccessToken(userId);
//         return res
//           .header('Authorization', newAccessToken)
//           .status(200)
//           .json({ success: true, message: 'Tokens refreshed' });
//       } else {
//         return res
//           .status(401)
//           .json({ success: false, message: 'Invalid tokens' });
//       }
//     }
//   } catch (error) {
//     return res.status(401).json({
//       status: 401,
//       body: { data: null },
//       success: false,
//       message: 'Invalid tokens',
//     });
//   }
// };
