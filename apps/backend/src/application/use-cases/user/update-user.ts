import { TUpdateUserInput, TUpdateUserOutput } from '@book-toshokan/libs/domain';
import { AbstractUserRepository } from '../../repository/user.repository';

export class UpdateUserUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute(input: TUpdateUserInput): Promise<TUpdateUserOutput> {
    return this.userRepository.updateUser({
      id: input.id,
      username: input.username,
      email: input.email,
      password: input.password,
      image: input.image,
    });
  }
}
