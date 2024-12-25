import { User } from '../../domain/entities/user.entity';
import { IUserRepository } from '../../application/interfaces/user-repository.interface';
import prisma from '../../prisma';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class UserRepository implements IUserRepository {
  private jwtSecret: string = process.env.JWT_SECRET || 'your_jwt_secret';

  async create(user: User): Promise<User> {
    const hashedPassword = await bcrypt.hash(user.password, 10);
    return prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async update(user: User): Promise<User> {
    return prisma.user.update({
      where: { id: user.id },
      data: { ...user },
    });
  }

  async delete(id: string): Promise<void> {
    await prisma.user.delete({ where: { id } });
  }

  private generateToken(user: User): string {
    const payload = { id: user.id, email: user.email };
    return jwt.sign(payload, this.jwtSecret, { expiresIn: '1h' }); // Token expires in 1 hour
  }

  async login(email: string, password: string): Promise<string | null> {
    const user = await this.findByEmail(email);

    if (!user) {
      return null;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return null;
    }

    return this.generateToken(user);
  }
}
