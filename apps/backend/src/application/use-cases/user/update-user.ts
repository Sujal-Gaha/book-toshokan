import { AbstractUserRepository, TUpdateUserInput, TUpdateUserOutput } from '../../repository/user.repository';

export class UpdateUserUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute(input: TUpdateUserInput): Promise<TUpdateUserOutput> {
    if (!input.id) {
      throw new Error('User id is required');
    }

    const userById = await this.userRepository.findUserById({
      id: input.id,
    });

    if (!userById) {
      throw new Error(`User with the id ${input.id} not found`);
    }

    return this.userRepository.updateUser({
      id: input.id,
      username: input.username,
      email: input.email,
      password: input.password,
      image: input.image,
    });
  }
}
