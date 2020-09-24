import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';

import UsersController from '../controllers/UsersController';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();
const usersController = new UsersController();

usersRouter.post(
  '/admin',
  celebrate({
    [Segments.BODY]: {
      login: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  usersController.createAdminUser,
);

usersRouter.use(ensureAuthenticated);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      login: Joi.string().required(),
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().min(6).required(),
    },
  }),
  usersController.create,
);

usersRouter.delete(
  '/:user_id',
  celebrate({
    [Segments.PARAMS]: {
      user_id: Joi.string().uuid().required(),
    },
  }),
  usersController.delete,
);

export default usersRouter;
