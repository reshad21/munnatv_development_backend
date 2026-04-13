import { Router } from 'express';
import auth from '../../middlewares/authorization';
import { featureNames } from '../../constant/adminSeedData';
import validation from '../../middlewares/validation';
import { TeamValidation } from './team.validation';
import { TeamController } from './team.controller';

const router = Router();

// Team CRUD operations
router.post(
  '/',
  auth([featureNames.teams]),
  validation(TeamValidation.createTeamValidationSchema),
  TeamController.createTeam,
);

router.get('/', TeamController.getAllTeams);

router.get('/:id', TeamController.getTeamById);

router.put(
  '/:id',
  auth([featureNames.teams]),
  validation(TeamValidation.updateTeamValidationSchema),
  TeamController.updateTeam,
);

router.delete('/:id', auth([featureNames.teams]), TeamController.deleteTeam);

// Team Social operations
router.post(
  '/socials',
  auth([featureNames.teams]),
  validation(TeamValidation.addTeamSocialValidationSchema),
  TeamController.addTeamSocial,
);

router.put(
  '/socials/:id',
  auth([featureNames.teams]),
  validation(TeamValidation.updateTeamSocialValidationSchema),
  TeamController.updateTeamSocial,
);

router.delete(
  '/socials/:id',
  auth([featureNames.teams]),
  TeamController.deleteTeamSocial,
);

export const TeamRoutes = router;
