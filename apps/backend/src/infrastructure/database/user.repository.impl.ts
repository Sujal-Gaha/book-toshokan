import {
  TCreateUserInput,
  TCreateUserOutput,
  TDeleteUserInput,
  TDeleteUserOutput,
  TFindUserByEmailInput,
  TFindUserByEmailOutput,
  TFindUserByIdInput,
  TFindUserByIdOutput,
  TLoginUserInput,
  TLoginUserOutput,
  TLogoutUserOutput,
  TUpdateUserInput,
  TUpdateUserOutput,
  User,
  UserRoleEnum,
} from '@book-toshokan/libs/domain';
import { AbstractUserRepository } from '../../application/repository/user.repository';
import { db } from '@book-toshokan/libs/backend-db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserRepository implements AbstractUserRepository {
  private jwtSecret: string = process.env.JWT_SECRET || 'your_jwt_secret';

  async createUser(input: TCreateUserInput): Promise<TCreateUserOutput> {
    const hashedPassword = await bcrypt.hash(input.password, 10);

    const user = await db.user.create({
      data: {
        username: input.username,
        email: input.email,
        password: hashedPassword,
        ...(input.image && { image: input.image }),
      },
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role as UserRoleEnum,
    };
  }

  async findUserById(input: TFindUserByIdInput): Promise<TFindUserByIdOutput> {
    const user = await db.user.findUnique({
      where: {
        id: input.id,
      },
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      role: user.role as UserRoleEnum,
    };
  }

  async findUserByEmail(input: TFindUserByEmailInput): Promise<TFindUserByEmailOutput> {
    const user = await db.user.findUnique({
      where: {
        email: input.email,
      },
    });

    return {
      id: user.id,
      username: user.username,
      email: user.email,
      password: user.password,
      role: user.role as UserRoleEnum,
    };
  }

  async updateUser(input: TUpdateUserInput): Promise<TUpdateUserOutput> {
    const updatedUser = await db.user.update({
      where: {
        id: input.id,
      },
      data: {
        username: input.username,
        email: input.email,
        password: input.password,
        ...(input.image && { image: input.image }),
      },
    });

    return {
      id: updatedUser.id,
      username: updatedUser.username,
      email: updatedUser.email,
      role: updatedUser.role as UserRoleEnum,
    };
  }

  async deleteUser(input: TDeleteUserInput): Promise<TDeleteUserOutput> {
    const deletedUser = await db.user.delete({
      where: {
        id: input.id,
      },
    });

    return {
      id: deletedUser.id,
      username: deletedUser.username,
      email: deletedUser.email,
      role: deletedUser.role as UserRoleEnum,
    };
  }

  private generateToken(user: User): string {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }

  async loginUser(input: TLoginUserInput): Promise<TLoginUserOutput> {
    const user = await this.findUserByEmail({
      email: input.email,
    });

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(input.password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    this.generateToken(user);
  }

  async logoutUser(): Promise<TLogoutUserOutput> {
    return null;
  }
}
