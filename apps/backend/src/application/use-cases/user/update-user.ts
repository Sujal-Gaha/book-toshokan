import { IUserRepository } from '../../interfaces/user-repository.interface';
import { User } from '../../../domain/entities/user.entity';

export class UpdateUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(user: User): Promise<User> {
    if (!user.id) {
      throw new Error('User id is required');
    }

    const userById = await this.userRepository.findById(user.id);

    if (!userById) {
      throw new Error(`User with the id ${user.id} not found`);
    }

    return this.userRepository.update(user);
  }
}
