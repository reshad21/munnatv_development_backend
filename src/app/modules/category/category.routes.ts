import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/adminSeedData';
import validation from '../../middlewares/validation';
import { categoryValidation } from './category.validation';
import { categoryController } from './category.controller';

const router = Router();

router.post(
  '/',
  auth([featureNames.categories]),
  validation(categoryValidation),
  categoryController.createCategory,
);

router.get('/', categoryController.getAllCategories);

router.get(
  '/:id',
  auth([featureNames.categories]),
  categoryController.getCategoryById,
);

router.put(
  '/:id',
  auth([featureNames.categories]),
  validation(categoryValidation),
  categoryController.updateCategory,
);

router.delete(
  '/:id',
  auth([featureNames.categories]),
  categoryController.deleteCategory,
);


export const CategoriesRoutes = router;