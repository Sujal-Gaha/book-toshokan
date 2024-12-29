import { AbstractUserRepository, TDeleteUserInput, TDeleteUserOutput } from '../../repository/user.repository';

export class DeleteUserUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute(input: TDeleteUserInput): Promise<TDeleteUserOutput> {
    if (!input.id) {
      throw new Error('User id is required');
    }

    return this.userRepository.deleteUser({
      id: input.id,
    });
  }
}
