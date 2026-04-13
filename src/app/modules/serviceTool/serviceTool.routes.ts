import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/adminSeedData';
import validation from '../../middlewares/validation';
import { ServiceToolValidation } from './serviceTool.validation';
import { ServiceToolController } from './serviceTool.controller';

const router = Router();

router.post(
  '/',
  auth([featureNames.services]),
  validation(ServiceToolValidation.createServiceToolValidationSchema),
  ServiceToolController.createServiceTool,
);

router.get('/', ServiceToolController.getAllServiceTools);

router.get('/:id', ServiceToolController.getServiceToolById);

router.put(
  '/:id',
  auth([featureNames.services]),
  validation(ServiceToolValidation.updateServiceToolValidationSchema),
  ServiceToolController.updateServiceTool,
);

router.delete(
  '/:id',
  auth([featureNames.services]),
  ServiceToolController.deleteServiceTool,
);

export const ServiceToolRoutes = router;
