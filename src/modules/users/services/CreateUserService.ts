import { injectable, inject } from 'tsyringe';

import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUsersRepository';
import IHashProvider from '../providers/HashProvider/models/IHashProvider';

import User from '../infra/typeorm/entities/User';

interface IRequest {
  login: string;
  name: string;
  email: string;
  password: string;
  admin?: boolean;
}

@injectable()
class CreateUserService {
  constructor(
    @inject('UsersRepository')
    private usersRepository: IUsersRepository,

    @inject('HashProvider')
    private hashProvider: IHashProvider,
  ) {}

  public async execute({
    login,
    name,
    email,
    password,
    admin,
  }: IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmailOrLogin(
      email,
      login,
    );

    if (checkUserExists) {
      throw new AppError('Email address or Login already used', 400);
    }

    const hashedPassword = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      login,
      name,
      email,
      password: hashedPassword,
      admin,
    });

    return user;
  }
}

export default CreateUserService;
