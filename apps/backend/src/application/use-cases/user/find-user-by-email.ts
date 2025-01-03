import { TFindUserByEmailInput, TFindUserByEmailOutput } from '@book-toshokan/libs/domain';
import { AbstractUserRepository } from '../../repository/user.repository';

export class FindUserByEmailUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute(input: TFindUserByEmailInput): Promise<TFindUserByEmailOutput> {
    return this.userRepository.findUserByEmail({
      email: input.email,
    });
  }
}
