import { Router } from 'express';
import auth from '../../middlewares/authorization';
import validation from '../../middlewares/validation';
import { RoleValidation } from './role.validation';
import { RoleController } from './role.controller';
import { featureNames } from '../../constant/adminSeedData';

const router = Router();

router.post(
  '/',
  auth([featureNames.roles]),
  validation(RoleValidation.createRoleValidation),
  RoleController.createRole,
);

router.get('/', auth([featureNames.roles]), RoleController.getRoles);

router.get('/:id', auth([featureNames.roles]), RoleController.getRoleById);

router.put(
  '/:id',
  auth([featureNames.roles]),
  validation(RoleValidation.updateRoleValidation),
  RoleController.updateRole,
);

router.delete('/:id', auth([featureNames.roles]), RoleController.deleteRole);

export const RoleRoutes = router;
