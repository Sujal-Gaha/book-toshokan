import { Request, Response } from "express";
import {
  asyncHandler,
  comparePassword,
  hashPassword,
  generateAccessToken,
  generateRefreshToken,
} from "../../utils";
import { prisma } from "../../config/client";

const registerUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  if (!(username && email && password)) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
        message: "Please provide all the required fields",
      },
      success: false,
    });
  }

  const isOldUser = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (isOldUser) {
    return res.status(409).json({
      status: 409,
      body: {
        data: null,
        message: "Email already in use",
      },
      success: false,
    });
  }

  const isUsernameTaken = await prisma.user.findFirst({
    where: {
      username: username,
    },
  });

  if (isUsernameTaken) {
    return res.status(409).json({
      status: 409,
      body: {
        data: null,
        message: "Username is already taken",
      },
      success: false,
    });
  }

  const salt = 10;

  const hashedPassword = await hashPassword(password, salt);

  const user = await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
    },
    select: {
      id: true,
      email: true,
      username: true,
      role: true,
    },
  });

  if (!user) {
    return res.status(500).json({
      status: 500,
      body: {
        data: null,
        message: "User registration failed",
      },
      success: false,
    });
  }

  const refreshToken = generateRefreshToken(user.id);

  return res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      maxAge: 3 * 24 * 60 * 60 * 1000,
      sameSite: "none",
      secure: true,
      path: "/",
    })
    .status(201)
    .json({
      status: 201,
      body: {
        data: user,
        message: "User registered successfully",
      },
      success: true,
    });
});

const loginUser = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  if (!(email && password)) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
        message: "Please provide all the required fields",
      },
      success: false,
    });
  }

  const user = await prisma.user.findFirst({
    where: {
      email: email,
    },
  });

  if (!user) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
        message: "Invalid Credential",
      },
      success: false,
    });
  }

  const isCompared = await comparePassword(password, user.password);

  if (!isCompared) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
        message: "Invalid credentials",
      },
      success: false,
    });
  }

  const accessToken = generateAccessToken(user.id);
  const refreshToken = generateRefreshToken(user.id);

  return res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 30 * 24 * 60 * 60 * 1000,
    })
    .header("Authorization", accessToken)
    .status(200)
    .json({
      status: 200,
      body: {
        data: user,
        message: "Login successful",
      },
      success: true,
    });
});

export const UserMutations = {
  registerUser,
  loginUser,
} as const;
