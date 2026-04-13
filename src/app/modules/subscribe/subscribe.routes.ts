import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/adminSeedData';
import validation from '../../middlewares/validation';
import { SubscribeValidation } from './subscribe.validation';
import { SubscribeController } from './subscribe.controller';

const router = Router();

router.post(
  '/',
  validation(SubscribeValidation.subscribeValidation),
  SubscribeController.subscribe,
);

router.get(
  '/',
  auth([featureNames.subscriptions]),
  SubscribeController.getAllSubscribers,
);

router.get(
  '/export',
  SubscribeController.exportSubscribers,
);

router.delete(
  '/:id',
  auth([featureNames.subscriptions]),
  SubscribeController.deleteSubscriber,
);

export const SubscribeRoutes = router;
