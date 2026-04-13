import { TAdminRole } from '../types/role.types';

export const seedRoleAdminData: TAdminRole = {
  name: 'Super Admin',
  roleFeature: [
    {
      name: 'Dashboard',
      path: 'dashboard',
      index: 1,
    },
    {
      name: "Categories",
      path: 'categories',
      index: 2,
    },
    {
      name: 'Projects',
      path: 'projects',
      index: 3,
    },
    {
      name: 'Services',
      path: 'services',
      index: 4,
    },
    {
      name: 'Teams',
      path: 'teams',
      index: 5,
    },
    {
      name: 'Blogs',
      path: 'blogs',
      index: 6,
    },
    {
      name: 'Contacts',
      path: 'contacts',
      index: 7,
    },
    {
      name: 'Subscriptions',
      path: 'subscriptions',
      index: 8,
    },
    {
      name: 'Roles',
      path: 'roles',
      index: 9,
    },
  ],
};

export const featureNames = {
  dashboard: 'Dashboard',
  categories: 'Categories',
  projects: 'Projects',
  services: 'Services',
  teams: 'Teams',
  blogs: 'Blogs',
  contacts: 'contacts',
  subscriptions: 'Subscriptions',
  roles: 'Roles',
};
