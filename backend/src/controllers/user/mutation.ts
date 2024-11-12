import { Request, Response } from "express";
import { asyncHandler, hashPassword } from "../../utils";
import { prisma } from "../../config/client";

const createUser = asyncHandler(async (req: Request, res: Response) => {
  const { username, email, password, role } = req.body;

  if (!(username && email && password)) {
    return res.status(400).json({
      status: 400,
      body: {
        data: null,
      },
      success: false,
      message: "Please provide all the required fields",
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
      },
      success: false,
      message: "Email already in use",
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
      },
      success: false,
      message: "Username is already taken",
    });
  }

  const salt = 10;

  const hashedPassword = await hashPassword(password, salt);

  const user = await prisma.user.create({
    data: {
      email: email,
      username: username,
      password: hashedPassword,
      role: role ? role : "USER",
    },
  });

  if (!user) {
    return res.status(500).json({
      status: 500,
      body: {
        data: null,
      },
      success: false,
      message: "User registration failed",
    });
  }

  return res.status(201).json({
    status: 201,
    body: {
      data: user,
    },
    success: true,
    message: "User registered successfully",
  });
});

export const UserMutations = {
  createUser,
} as const;
