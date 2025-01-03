import { TFindUserByIdInput, TFindUserByIdOutput } from '@book-toshokan/libs/domain';
import { AbstractUserRepository } from '../../repository/user.repository';

export class FindUserByIdUseCase {
  constructor(private userRepository: AbstractUserRepository) {}

  async execute(input: TFindUserByIdInput): Promise<TFindUserByIdOutput> {
    return this.userRepository.findUserById({
      id: input.id,
    });
  }
}
