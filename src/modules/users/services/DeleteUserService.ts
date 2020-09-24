import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  loggedIdUser: string;
  user_id: string;
}

@injectable()
class DeleteUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,
  ) {}

  public async execute({ loggedIdUser, user_id }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User nor found');
    }

    if (loggedIdUser === user_id) {
      throw new AppError('You cannot delete yourself register');
    }

    return this.usersRepository.delete(user_id);
  }
}

export default DeleteUserService;
