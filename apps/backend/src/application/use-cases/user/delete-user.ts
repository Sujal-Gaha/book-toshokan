import { TDeleteUserInput, TDeleteUserOutput } from '@book-toshokan/libs/domain';
import { AbstractUserRepository } from '../../repository/user.repository';

export class DeleteUserUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute(input: TDeleteUserInput): Promise<TDeleteUserOutput> {
    return this.userRepository.deleteUser({
      id: input.id,
    });
  }
}
