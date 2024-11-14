import { NextFunction, Request, Response } from "express";
import { verifyToken, generateRefreshToken } from "./utils"; // Assuming generateRefreshToken is a utility function for generating a new refresh token

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const accessToken = req.headers["authorization"];
  const refreshToken = req.cookies["refreshToken"];

  if (!accessToken || !refreshToken) {
    res.status(401).json({
      status: 401,
      body: {
        data: null,
      },
      success: false,
      message: "Access denied. No access token or refresh token provided.",
    });
    return;
  }

  try {
    const accessDecoded = verifyToken(accessToken);
    let refreshDecoded = verifyToken(refreshToken);

    if (!refreshDecoded) {
      const newRefreshToken = generateRefreshToken(accessDecoded);
      res.cookie("refreshToken", newRefreshToken, {
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
        message: "Access denied. Invalid access token or refresh token.",
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
      message: "Access denied. Invalid token(s).",
    });
    return;
  }
};
