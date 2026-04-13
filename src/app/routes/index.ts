import { Router } from 'express';
import { TModuleRoute } from '../types/moduleRoute.type';
import { AuthRoutes } from '../modules/auth/auth.routes';
import { RoleRoutes } from '../modules/role/role.routes';
import { BlogRoutes } from '../modules/blog/blog.routes';
import { SubscribeRoutes } from '../modules/subscribe/subscribe.routes';
import { ContactRoutes } from '../modules/contact/contact.routes';
import { CategoriesRoutes } from '../modules/category/category.routes';
import { ProjectRoutes } from '../modules/project/project.routes';
import { TeamRoutes } from '../modules/team/team.routes';
import { ServiceToolRoutes } from '../modules/serviceTool/serviceTool.routes';
import { IndustryWeServeRoutes } from '../modules/industryWeServe/industryWeServe.routes';

const router = Router();

const moduleRoutes: TModuleRoute[] = [
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/roles',
    route: RoleRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes,
  },
  {
    path: '/subscribers',
    route: SubscribeRoutes,
  },
  {
    path: '/contacts',
    route: ContactRoutes,
  },
  {
    path: '/categories',
    route: CategoriesRoutes,
  },
  {
    path: '/projects',
    route: ProjectRoutes,
  },
  {
    path: '/teams',
    route: TeamRoutes,
  },
  {
    path: '/service-tools',
    route: ServiceToolRoutes,
  },
  {
    path: '/industry-we-serve',
    route: IndustryWeServeRoutes,
  },
];

moduleRoutes.forEach((route) => {
  router.use(route.path, route.route);
});

export default router;
