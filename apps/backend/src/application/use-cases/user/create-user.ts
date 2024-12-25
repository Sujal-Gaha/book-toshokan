import { IUserRepository } from '../../interfaces/user-repository.interface';
import { User } from '../../../domain/entities/user.entity';

export class CreateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(user: User): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(user.email);

    if (existingUser) {
      throw new Error('User already exists');
    }

    return this.userRepository.create(user);
  }
}
