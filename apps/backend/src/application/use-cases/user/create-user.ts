import { TCreateUserInput, TCreateUserOutput } from '@book-toshokan/libs/domain';
import { AbstractUserRepository } from '../../repository/user.repository';

export class CreateUserUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute(input: TCreateUserInput): Promise<TCreateUserOutput> {
    const userExists = await this.userRepository.findUserByEmail({
      email: input.email,
    });

    if (userExists) {
      throw new Error('User already exists');
    }

    return this.userRepository.createUser({
      username: input.username,
      email: input.email,
      password: input.password,
      image: input.image,
    });
  }
}
