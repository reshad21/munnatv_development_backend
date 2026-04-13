import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/adminSeedData';
import validation from '../../middlewares/validation';
import { ContactValidation } from './contact.validation';
import { ContactController } from './contact.controller';

const router = Router();

router.post(
  '/',
  validation(ContactValidation.createContactValidationSchema),
  ContactController.createContact,
);

router.get(
  '/',
  auth([featureNames.contacts]),
  ContactController.getAllContacts,
);

router.get(
  '/:id',
  auth([featureNames.contacts]),
  ContactController.getContactById,
);

router.put(
  '/:id',
  auth([featureNames.contacts]),
  validation(ContactValidation.updateContactValidationSchema),
  ContactController.updateContact,
);

router.delete(
  '/:id',
  auth([featureNames.contacts]),
  ContactController.deleteContact,
);

export const ContactRoutes = router;
