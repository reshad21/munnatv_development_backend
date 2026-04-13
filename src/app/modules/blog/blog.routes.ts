import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/adminSeedData';
import validation from '../../middlewares/validation';
import { BlogValidation } from './blog.validation';
import { BlogController } from './blog.controller';

const router = Router();

router.post(
  '/',
  auth([featureNames.blogs]),
  validation(BlogValidation.createBlogValidationSchema),
  BlogController.createBlog,
);

router.post(
  '/comments',
  validation(BlogValidation.addBlogCommentValidationSchema),
  BlogController.addBlogComment,
);

router.get('/', BlogController.getAllBlogs);

router.get('/:id', BlogController.getBlogById);

router.put(
  '/:id',
  auth([featureNames.blogs]),
  validation(BlogValidation.updateBlogValidationSchema),
  BlogController.updateBlog,
);

router.put(
  '/comments/:id',
  auth([featureNames.blogs]),
  validation(BlogValidation.updateBlogCommentValidationSchema),
  BlogController.updateBlogComment,
);

router.delete('/:id', auth([featureNames.blogs]), BlogController.deleteBlog);

export const BlogRoutes = router;
