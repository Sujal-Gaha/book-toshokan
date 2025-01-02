import { User } from '../../domain/entities/user.entity';
import {
  AbstractUserRepository,
  TCreateUserInput,
  TCreateUserOutput,
  TDeleteUserInput,
  TDeleteUserOutput,
  TFindUserByEmailInput,
  TFindUserByEmailOutput,
  TFindUserByIdInput,
  TFindUserByIdOutput,
  TUpdateUserInput,
  TUpdateUserOutput,
} from '../../application/repository/user.repository';
import { db } from '@book-toshokan/backend-db';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserRepository implements AbstractUserRepository {
  private jwtSecret: string = process.env.JWT_SECRET || 'your_jwt_secret';

  async createUser(input: TCreateUserInput): Promise<TCreateUserOutput> {
    const { username, email, password } = input;
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await db.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });
    return { data: user };
  }

  async findUserById(input: TFindUserByIdInput): Promise<TFindUserByIdOutput> {
    const user = await db.user.findUnique({ where: { id: input.id } });
    return { data: user };
  }

  async findUserByEmail(input: TFindUserByEmailInput): Promise<TFindUserByEmailOutput> {
    const user = await db.user.findUnique({ where: { email: input.email } });
    return { data: user };
  }

  async updateUser(input: TUpdateUserInput): Promise<TUpdateUserOutput> {
    const { id, username, email, password, image } = input;
    const updatedUser = await db.user.update({
      where: { id },
      data: { username, email, password, image },
    });
    return { data: updatedUser };
  }

  async deleteUser(input: TDeleteUserInput): Promise<TDeleteUserOutput> {
    const deletedUser = await db.user.delete({ where: { id: input.id } });
    return { data: deletedUser };
  }

  private generateToken(user: User): string {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' });
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.findUserByEmail({ email });

    if (!user.data) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.data.password);

    if (!isPasswordValid) {
      return null;
    }

    return this.generateToken(user.data);
  }
}
