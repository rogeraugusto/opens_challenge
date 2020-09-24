import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUsersRepository';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  user_id: string;
  login: string;
  name: string;
  email: string;
  old_password?: string;
  password?: string;
}

@injectable()
class UpdateProfileService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    user_id,
    login,
    name,
    email,
    password,
    old_password,
  }: IRequest): Promise<User> {
    const user = await this.usersRepository.findById(user_id);

    if (!user) {
      throw new AppError('User nor found');
    }

    const userWithUpdatedEmailOrLogin = await this.usersRepository.findByEmailOrLogin(
      email,
      login,
    );

    if (
      userWithUpdatedEmailOrLogin &&
      userWithUpdatedEmailOrLogin.id !== user_id
    ) {
      throw new AppError('Email address or Login already used', 400);
    }

    user.login = login;
    user.name = name;
    user.email = email;

    if (password && !old_password) {
      throw new AppError('Inform the old password to update your password');
    }

    if (password && old_password) {
      const checkOldPassword = await this.hashProvider.compareHash(
        old_password,
        user.password,
      );

      if (!checkOldPassword) {
        throw new AppError('Old Password does not match');
      }

      user.password = await this.hashProvider.generateHash(password);
    }

    return this.usersRepository.save(user);
  }
}

export default UpdateProfileService;
