import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user';
import { UserRepository } from '../../infrastructure/database/user.repository.impl';
import { FindUserByIdUseCase } from '../../application/use-cases/user/find-user-by-id-';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user';
import { FindUserByEmailUseCase } from '../../application/use-cases/user/find-user-by-email';
import {
  TApiError,
  TApiResponse,
  TCreateUserOutput,
  TDeleteUserOutput,
  TFindUserByEmailOutput,
  TFindUserByIdOutput,
  TLoginUserOutput,
  TLogoutUserOutput,
  TUpdateUserOutput,
} from '@book-toshokan/libs/domain';
import { StatusCodes } from 'http-status-codes';
import { LoginUserUseCase } from '../../application/use-cases/user/login-user';
import { DeleteUserUseCase } from '../../application/use-cases/user/delete-user';

const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);
const deleteUserUseCase = new DeleteUserUseCase(userRepository);
const loginUserUseCase = new LoginUserUseCase(userRepository);

export class UserController {
  static async createUser(req: Request, res: Response) {
    const { username, email, password, image } = req.body;

    if (!username || !email || !password) {
      const response: TApiError = {
        status: StatusCodes.BAD_REQUEST,
        body: {
          data: null,
          message: 'Missing required fields',
        },
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
      const user = await createUserUseCase.execute({
        username: username,
        email: email,
        password: password,
        ...(image && { image: image }),
      });

      const response: TApiResponse<TCreateUserOutput> = {
        status: StatusCodes.CREATED,
        body: {
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          message: 'User created successfully',
        },
      };

      return res.status(StatusCodes.CREATED).json(response);
    } catch (error) {
      console.error('Error while creating user:', error);

      const response: TApiError = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          data: null,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
      };

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  static async findUserById(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      const response: TApiError = {
        status: StatusCodes.BAD_REQUEST,
        body: {
          data: null,
          message: 'Missing required fields',
        },
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
      const user = await findUserByIdUseCase.execute({
        id: userId,
      });

      if (!user) {
        const response: TApiError = {
          status: StatusCodes.NOT_FOUND,
          body: {
            data: null,
            message: 'User not found',
          },
        };
        return res.status(StatusCodes.NOT_FOUND).json(response);
      }

      const response: TApiResponse<TFindUserByIdOutput> = {
        status: StatusCodes.OK,
        body: {
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          message: 'Fetched the user successfully',
        },
      };

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error('Error while fetching user by id:', error);

      const response: TApiError = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          data: null,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
      };

      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  static async findUserByEmail(req: Request, res: Response) {
    const { email } = req.params;

    if (!email) {
      const response: TApiError = {
        status: StatusCodes.BAD_REQUEST,
        body: {
          data: null,
          message: 'Missing required fields',
        },
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
      const user = await findUserByEmailUseCase.execute({
        email: email,
      });

      if (!user) {
        const response: TApiError = {
          status: StatusCodes.NOT_FOUND,
          body: {
            data: null,
            message: 'User not found',
          },
        };
        return res.status(StatusCodes.NOT_FOUND).json(response);
      }

      const response: TApiResponse<TFindUserByEmailOutput> = {
        status: StatusCodes.OK,
        body: {
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
            password: user.password,
          },
          message: 'Fetched the user successfully',
        },
      };

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error('Error while fetching user by email:', error);

      const response: TApiError = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          data: null,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
      };
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  static async updateUser(req: Request, res: Response) {
    const { userId } = req.params;
    const { username, email, password, image } = req.body;

    if (!userId) {
      const response: TApiError = {
        status: StatusCodes.BAD_REQUEST,
        body: {
          data: null,
          message: 'Missing required fields',
        },
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    if (!username || !email || !password) {
      const response: TApiError = {
        status: StatusCodes.BAD_REQUEST,
        body: {
          data: null,
          message: 'Missing required fields',
        },
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
      const user = await updateUserUseCase.execute({
        id: userId,
        username: username,
        email: email,
        password: password,
        image: image,
      });

      const response: TApiResponse<TUpdateUserOutput> = {
        status: StatusCodes.OK,
        body: {
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          message: 'Updated the user successfully',
        },
      };

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error('Error while updating user:', error);

      const response: TApiError = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          data: null,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
      };
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  static async deleteUser(req: Request, res: Response) {
    const { userId } = req.params;

    if (!userId) {
      const response: TApiError = {
        status: StatusCodes.BAD_REQUEST,
        body: {
          data: null,
          message: 'Missing required fields',
        },
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
      const deletedUser = await deleteUserUseCase.execute({
        id: userId,
      });

      const response: TApiResponse<TDeleteUserOutput> = {
        status: StatusCodes.OK,
        body: {
          data: {
            id: deletedUser.id,
            username: deletedUser.username,
            email: deletedUser.email,
            role: deletedUser.role,
          },
          message: 'Deleted the user successfully',
        },
      };

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error('Error while deleting user:', error);

      const response: TApiError = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          data: null,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
      };
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  static async loginUser(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      const response: TApiError = {
        status: StatusCodes.BAD_REQUEST,
        body: {
          data: null,
          message: 'Missing required fields',
        },
      };
      return res.status(StatusCodes.BAD_REQUEST).json(response);
    }

    try {
      const user = await loginUserUseCase.execute({
        email: email,
        password: password,
      });

      const response: TApiResponse<TLoginUserOutput> = {
        status: StatusCodes.OK,
        body: {
          data: {
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role,
          },
          message: 'Logged in successfully',
        },
      };

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error('Error while logging in user:', error);

      const response: TApiError = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          data: null,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
      };
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }

  static async logoutUser(req: Request, res: Response) {
    try {
      const response: TApiResponse<TLogoutUserOutput> = {
        status: StatusCodes.OK,
        body: {
          data: null,
          message: 'Logged out successfully',
        },
      };

      return res.status(StatusCodes.OK).json(response);
    } catch (error) {
      console.error('Error while logging out user:', error);

      const response: TApiError = {
        status: StatusCodes.INTERNAL_SERVER_ERROR,
        body: {
          data: null,
          message: error instanceof Error ? error.message : 'An unknown error occurred',
        },
      };
      return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json(response);
    }
  }
}
