import { IUserRepository } from '../../repository/user.repository';
import { User } from '../../../domain/entities/user.entity';

export class FindUserByEmailUseCase {
  constructor(private userRepository: IUserRepository) {}

  async execute(user: User): Promise<User> {
    if (!user.email) {
      throw new Error('User email is required');
    }

    return this.userRepository.findByEmail(user.email);
  }
}
