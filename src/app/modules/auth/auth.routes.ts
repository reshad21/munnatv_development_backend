import { Router } from 'express';
import validation from '../../middlewares/validation';

import auth from '../../middlewares/authorization';
import { authValidations } from './auth.validation';
import { AuthController } from './auth.controller';

const router = Router();

router.post(
  '/login',
  validation(authValidations.loginValidation),
  AuthController.login,
);

router.post(
  '/register',
  validation(authValidations.registerValidation),
  AuthController.register,
);

router.post('/forget-password', AuthController.forgetPassword);

router.post('/reset-password', AuthController.resetPassword);

router.post('/refresh-token', AuthController.refreshAccessToken);

router.get('/me', auth([]), AuthController.getLoggedAdminDetails);

export const AuthRoutes = router;
