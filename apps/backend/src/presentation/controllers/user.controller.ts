import { Request, Response } from 'express';
import { CreateUserUseCase } from '../../application/use-cases/user/create-user';
import { UserRepository } from '../../infrastructure/database/user-repository';
import { FindUserByIdUseCase } from '../../application/use-cases/user/find-user-by-id-';
import { UpdateUserUseCase } from '../../application/use-cases/user/update-user';
import { FindUserByEmailUseCase } from '../../application/use-cases/user/find-user-by-email';

const userRepository = new UserRepository();

const createUserUseCase = new CreateUserUseCase(userRepository);
const findUserByIdUseCase = new FindUserByIdUseCase(userRepository);
const findUserByEmailUseCase = new FindUserByEmailUseCase(userRepository);
const updateUserUseCase = new UpdateUserUseCase(userRepository);

export class UserController {
  static async createUser(req: Request, res: Response) {
    try {
      const user = await createUserUseCase.execute(req.body);
      res.status(201).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async findUserById(req: Request, res: Response) {
    try {
      const user = await findUserByIdUseCase.execute(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async findUserByEmail(req: Request, res: Response) {
    try {
      const user = await findUserByEmailUseCase.execute(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async updateUser(req: Request, res: Response) {
    try {
      const user = await updateUserUseCase.execute(req.body);
      res.status(200).json(user);
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }
}
