import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/adminSeedData';
import validation from '../../middlewares/validation';
import { ProjectValidation } from './project.validation';
import { ProjectController } from './project.controller';

const router = Router();

// Project CRUD operations
router.post(
  '/',
  auth([featureNames.projects]),
  validation(ProjectValidation.createProjectValidationSchema),
  ProjectController.createProject,
);

router.get('/', ProjectController.getAllProjects);

router.get('/:id', ProjectController.getProjectById);

router.put(
  '/:id',
  auth([featureNames.projects]),
  validation(ProjectValidation.updateProjectValidationSchema),
  ProjectController.updateProject,
);

router.delete(
  '/:id',
  auth([featureNames.projects]),
  ProjectController.deleteProject,
);

// Project Features operations
router.post(
  '/features',
  auth([featureNames.projects]),
  validation(ProjectValidation.addProjectFeatureValidationSchema),
  ProjectController.addProjectFeature,
);

router.put(
  '/features/:id',
  auth([featureNames.projects]),
  validation(ProjectValidation.updateProjectFeatureValidationSchema),
  ProjectController.updateProjectFeature,
);

router.delete(
  '/features/:id',
  auth([featureNames.projects]),
  ProjectController.deleteProjectFeature,
);

// Project Tech Stack operations
router.post(
  '/tech-stacks',
  auth([featureNames.projects]),
  validation(ProjectValidation.addProjectTechStackValidationSchema),
  ProjectController.addProjectTechStack,
);

router.put(
  '/tech-stacks/:id',
  auth([featureNames.projects]),
  validation(ProjectValidation.updateProjectTechStackValidationSchema),
  ProjectController.updateProjectTechStack,
);

router.delete(
  '/tech-stacks/:id',
  auth([featureNames.projects]),
  ProjectController.deleteProjectTechStack,
);

export const ProjectRoutes = router;
