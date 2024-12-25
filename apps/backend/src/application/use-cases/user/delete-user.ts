import { User } from '../../../domain/entities/user.entity';
import { IUserRepository } from '../../repository/user.repository';

export class DeleteUserUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(user: User): Promise<void> {
    if (!user.id) {
      throw new Error('User id is required');
    }

    return this.userRepository.delete(user.id);
  }
}
