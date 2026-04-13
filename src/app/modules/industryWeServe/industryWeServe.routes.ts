import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/adminSeedData';
import validation from '../../middlewares/validation';
import { IndustryWeServeValidation } from './industryWeServe.validation';
import { IndustryWeServeController } from './industryWeServe.controller';

const router = Router();

router.post(
  '/',
  auth([featureNames.services]),
  validation(IndustryWeServeValidation.createIndustryWeServeValidationSchema),
  IndustryWeServeController.createIndustryWeServe,
);

router.get('/', IndustryWeServeController.getAllIndustryWeServe);

router.get('/:id', IndustryWeServeController.getIndustryWeServeById);

router.put(
  '/:id',
  auth([featureNames.services]),
  validation(IndustryWeServeValidation.updateIndustryWeServeValidationSchema),
  IndustryWeServeController.updateIndustryWeServe,
);

router.delete(
  '/:id',
  auth([featureNames.services]),
  IndustryWeServeController.deleteIndustryWeServe,
);

export const IndustryWeServeRoutes = router;
