import addUsefulLink from '../containers/addUsefulLink/loadable';
import CreateUser from '../containers/createUser/loadable';
import Directory from '../containers/directory/loadable';
import DirectoryImporter from '../containers/directoryImporter/loadable';
import EditUser from '../containers/editUser/loadable';
import Home from '../containers/home/loadable';
import Login from '../containers/login';
import Quote from '../containers/qoute/loadable';
import usefulLinks from '../containers/usefulLinks/loadable';
import UserProfile from '../containers/userProfile/loadable';
import { ROLES } from '../utils/constants';

const routeTypes = { public: 'public', private: 'private' };
export const routeArray = [
  {
    path: '/',
    component: Login,
    exact: true,
    breadCrumbKey: 'login',
    routeType: routeTypes.public,
  },
  {
    path: '/home',
    component: Home,
    exact: true,
    breadCrumbKey: 'home',
    routeType: routeTypes.private,
  },
  {
    path: '/directory',
    component: Directory,
    exact: true,
    breadCrumbKey: 'Directory',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/upload',
        component: DirectoryImporter,
        exact: true,
        breadCrumbKey: 'Upload Directory',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: `/add`,
        component: CreateUser,
        exact: true,
        breadCrumbKey: 'Create User',
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
      {
        path: '/edit/:id',
        component: EditUser,
        exact: true,
        simplifiedPath: 'edit',
        breadCrumbKey: 'Edit User',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        roles: [ROLES.ADMIN],
      },
    ],
  },

  {
    path: '/quote',
    component: Quote,
    exact: true,
    breadCrumbKey: 'Daily Quote',
    routeType: routeTypes.private,
    roles: [ROLES.ADMIN],
  },
  {
    path: '/profile',
    component: UserProfile,
    exact: true,
    breadCrumbKey: 'My Profile',
    routeType: routeTypes.private,
  },
  {
    path: '/useful-links',
    component: usefulLinks,
    exact: true,
    breadCrumbKey: 'Useful Links',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: addUsefulLink,
        exact: true,
        breadCrumbKey: 'Add New Link',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: addUsefulLink,
        simplifiedPath: 'edit',
        exact: true,
        noOfEnteriesToSkipAfterThisEntry: 1,
        breadCrumbKey: 'Edit Link',
        routeType: routeTypes.private,
      },
    ],
  },
];
