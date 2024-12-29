import {
  AbstractUserRepository,
  TFindUserByEmailInput,
  TFindUserByEmailOutput,
} from '../../repository/user.repository';

export class FindUserByEmailUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute(input: TFindUserByEmailInput): Promise<TFindUserByEmailOutput> {
    if (!input.email) {
      throw new Error('User email is required');
    }

    return this.userRepository.findUserByEmail({
      email: input.email,
    });
  }
}
