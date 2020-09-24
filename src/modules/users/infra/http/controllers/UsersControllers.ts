import { Request, Response } from 'express';
import { container } from 'tsyringe';
import { classToClass } from 'class-transformer';

import AppError from '@shared/errors/AppError';

import CreateUserService from '@modules/users/services/CreateUserService';
import DeleteUserService from '@modules/users/services/DeleteUserService';

export default class UsersController {
  public async create(request: Request, response: Response): Promise<Response> {
    try {
      const { admin: userAdmin } = request.user;

      if (!userAdmin) {
        throw new AppError('Only admin users can perform this request', 401);
      }

      const { login, name, email, password, admin } = request.body;

      const createUser = container.resolve(CreateUserService);

      const user = await createUser.execute({
        login,
        name,
        email,
        password,
        admin,
      });

      return response.json(classToClass(user));
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }

  public async delete(request: Request, response: Response): Promise<Response> {
    try {
      const { id: loggedIdUser, admin: userAdmin } = request.user;

      if (!userAdmin) {
        throw new AppError('Only admin users can perform this request', 401);
      }

      const { user_id } = request.params;

      const deleteUser = container.resolve(DeleteUserService);

      await deleteUser.execute({ loggedIdUser, user_id });

      return response.status(200).json();
    } catch (err) {
      return response.status(400).json({ error: err.message });
    }
  }
}
