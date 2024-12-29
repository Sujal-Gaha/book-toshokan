import { AbstractUserRepository, TFindUserByIdInput, TFindUserByIdOutput } from '../../repository/user.repository';

export class FindUserByIdUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute(input: TFindUserByIdInput): Promise<TFindUserByIdOutput> {
    if (!input.id) {
      throw new Error('User id is required');
    }

    const userById = await this.userRepository.findUserById({
      id: input.id,
    });
    if (!userById) {
      throw new Error(`User with the id ${input.id} not found`);
    }

    return this.userRepository.findUserById({
      id: input.id,
    });
  }
}
