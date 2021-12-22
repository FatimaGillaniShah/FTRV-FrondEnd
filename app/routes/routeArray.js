import addUsefulLink from '../containers/addUsefulLink/loadable';
import addLocation from '../containers/addLocation/loadable';
import addCeoMessage from '../containers/addCeoMessage/loadable';
import CreateUser from '../containers/createUser/loadable';
import Directory from '../containers/directory/loadable';
import DirectoryImporter from '../containers/directoryImporter/loadable';
import EditUser from '../containers/editUser/loadable';
import Announcement from '../containers/announcement/loadable';
import Blogs from '../containers/blog/loadable';
import BlogDetail from '../containers/blogDetail/loadable';
import CreateAnnouncement from '../containers/createAnnouncement/loadable';
import EditAnnouncement from '../containers/editAnnouncement/loadable';
import Home from '../containers/home/loadable';
import Login from '../containers/login';
import Quote from '../containers/qoute/loadable';
import usefulLinks from '../containers/usefulLinks/loadable';
import UserProfile from '../containers/userProfile/loadable';
import CeoMessage from '../containers/ceoMessage/loadable';
import Events from '../containers/events/loadable';
import { PERMISSIONS, features, nonFeatures } from '../utils/constants';
import createEvent from '../containers/createEvent/loadable';
import ViewEvent from '../containers/viewEvent/loadable';
import createBlog from '../containers/createBlog/loadable';
import createPoll from '../containers/createPoll/loadable';
import Polls from '../containers/polls/loadable';
import CreateLinkCategory from '../containers/createLinkCategory/loadable';
import UsefulLinksCategory from '../containers/usefulLinksCategory/loadable';
import Locations from '../containers/location/loadable';
import Departments from '../containers/department/loadable';
import CreateDepartment from '../containers/addDepartment/loadable';
import Documents from '../containers/document/loadable';
import AddDocument from '../containers/createDocument/loadable';
import AddRingGroup from '../containers/createRingGroup/loadable';
import RingGroup from '../containers/ringGroup/loadable';
import Jobs from '../containers/jobs/loadable';
import AddApplicant from '../containers/createApplicant/loadable';
import Applicant from '../containers/applicant/loadable';
import AddJob from '../containers/createJob/loadable';
import AddProfitCenter from '../containers/createProfitCenter/loadable';
import ProfitCenter from '../containers/profitCenter';
import AddGroup from '../containers/createGroup/loadable';
import Groups from '../containers/groups';
import BulkEditUser from '../containers/bulkEditUser/loadable';
import AccessDenied from '../containers/accessDenied/loadable';

const routeTypes = { public: 'public', private: 'private' };
const { READ, WRITE } = PERMISSIONS;
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
    resource: nonFeatures.HOME,
    exact: true,
    breadCrumbKey: 'home',
    routeType: routeTypes.private,
  },
  {
    path: '/directory',
    component: Directory,
    exact: true,
    resource: `${features.DIRECTORY}-${READ}`,
    breadCrumbKey: 'Directory',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/upload',
        component: DirectoryImporter,
        resource: `${features.DIRECTORY}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Upload Directory',
        routeType: routeTypes.private,
      },
      {
        path: `/add`,
        component: CreateUser,
        exact: true,
        resource: `${features.DIRECTORY}-${WRITE}`,
        breadCrumbKey: 'Create User',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: EditUser,
        exact: true,
        simplifiedPath: 'edit',
        resource: `${features.DIRECTORY}-${WRITE}`,
        breadCrumbKey: 'Edit User',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
      {
        path: '/bulk-edit/:ids',
        component: BulkEditUser,
        exact: true,
        simplifiedPath: 'bulkEdit',
        resource: `${features.DIRECTORY}-${WRITE}`,
        breadCrumbKey: 'Edit Bulk User',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },

  {
    path: '/quote',
    component: Quote,
    resource: `${features.QUOTE}-${READ}`,
    exact: true,
    breadCrumbKey: 'Daily Quote',
    routeType: routeTypes.private,
  },
  {
    path: '/profile',
    component: UserProfile,
    resource: `${nonFeatures.PROFILE}`,
    exact: true,
    breadCrumbKey: 'My Profile',
    routeType: routeTypes.private,
  },
  {
    path: '/ceo-message',
    component: CeoMessage,
    exact: true,
    resource: `${features.MESSAGE_FROM_CEO}-${READ}`,
    breadCrumbKey: 'Ceo Message',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/edit',
        component: addCeoMessage,
        exact: true,
        resource: `${features.MESSAGE_FROM_CEO}-${WRITE}`,
        breadCrumbKey: 'Edit Ceo Message',
      },
    ],
  },
  {
    path: '/announcement',
    component: Announcement,
    resource: `${features.ANNOUNCEMENT}-${READ}`,
    exact: true,
    breadCrumbKey: 'Announcement',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: `/add`,
        component: CreateAnnouncement,
        resource: `${features.ANNOUNCEMENT}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Create Announcement',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: EditAnnouncement,
        resource: `${features.ANNOUNCEMENT}-${WRITE}`,
        exact: true,
        simplifiedPath: 'edit',
        breadCrumbKey: 'Edit Announcement',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/events',
    component: Events,
    resource: `${features.EVENTS}-${READ}`,
    exact: true,
    breadCrumbKey: 'Events',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: createEvent,
        exact: true,
        resource: `${features.EVENTS}-${WRITE}`,
        breadCrumbKey: 'Create New Event',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: createEvent,
        exact: true,
        resource: `${features.EVENTS}-${WRITE}`,
        breadCrumbKey: 'Edit Event',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
      {
        path: '/view/:id',
        component: ViewEvent,
        exact: true,
        resource: `${features.EVENTS}-${READ}`,
        breadCrumbKey: 'View Event',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/blogs',
    component: Blogs,
    exact: true,
    resource: `${features.BLOG}-${READ}`,
    breadCrumbKey: 'Blogs',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: createBlog,
        exact: true,
        resource: `${features.BLOG}-${WRITE}`,
        breadCrumbKey: 'Create New Blog',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: createBlog,
        resource: `${features.BLOG}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Edit Blog',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
      {
        path: '/detail/:id',
        component: BlogDetail,
        exact: true,
        resource: `${features.BLOG}-${READ}`,
        breadCrumbKey: 'Detail',
        simplifiedPath: 'detail',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/polls',
    component: Polls,
    exact: true,
    resource: `${features.POLLS}-${READ}`,
    breadCrumbKey: 'Polls',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: createPoll,
        resource: `${features.POLLS}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Create New Event',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: createPoll,
        resource: `${features.POLLS}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Edit Poll',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/link-categories',
    component: UsefulLinksCategory,
    exact: true,
    resource: `${features.LINKS}-${READ}`,
    breadCrumbKey: 'Link Categories',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: CreateLinkCategory,
        exact: true,
        resource: `${features.LINKS}-${WRITE}`,
        breadCrumbKey: 'Create New Link Category',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: CreateLinkCategory,
        exact: true,
        resource: `${features.LINKS}-${WRITE}`,
        breadCrumbKey: 'Edit Link Category',
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
      {
        path: '/useful-links/:categoryId',
        component: usefulLinks,
        exact: true,
        resource: `${features.USEFUL_LINKS}-${READ}`,
        breadCrumbKey: 'Useful Links',
        simplifiedPath: 'useful-links',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
        nestedRoutes: [
          {
            path: '/add',
            component: addUsefulLink,
            exact: true,
            resource: `${features.USEFUL_LINKS}-${WRITE}`,
            thirdLvlNesting: true,
            breadCrumbKey: 'Add New Link',
            routeType: routeTypes.private,
          },
          {
            path: '/edit/:id',
            component: addUsefulLink,
            resource: `${features.USEFUL_LINKS}-${WRITE}`,
            simplifiedPath: 'edit',
            thirdLvlNesting: true,
            exact: true,
            noOfEnteriesToSkipAfterThisEntry: 1,
            breadCrumbKey: 'Edit Link',
            routeType: routeTypes.private,
          },
        ],
      },
    ],
  },
  {
    path: '/locations',
    component: Locations,
    exact: true,
    resource: `${features.LOCATION}-${READ}`,
    breadCrumbKey: 'Locations',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: addLocation,
        resource: `${features.LOCATION}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Add New Location',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: addLocation,
        resource: `${features.LOCATION}-${WRITE}`,
        simplifiedPath: 'edit',
        exact: true,
        noOfEnteriesToSkipAfterThisEntry: 1,
        breadCrumbKey: 'Edit Location',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/departments',
    component: Departments,
    resource: `${features.DEPARTMENT}-${READ}`,
    exact: true,
    breadCrumbKey: 'Departments',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: CreateDepartment,
        exact: true,
        resource: `${features.DEPARTMENT}-${WRITE}`,
        breadCrumbKey: 'Add New Department',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: CreateDepartment,
        simplifiedPath: 'edit',
        resource: `${features.DEPARTMENT}-${WRITE}`,
        exact: true,
        noOfEnteriesToSkipAfterThisEntry: 1,
        breadCrumbKey: 'Edit Department',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/documents',
    component: Documents,
    exact: true,
    resource: `${features.FILE_STORAGE}-${READ}`,
    breadCrumbKey: 'Documents',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: AddDocument,
        exact: true,
        resource: `${features.FILE_STORAGE}-${WRITE}`,
        breadCrumbKey: 'Add New Document',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: AddDocument,
        resource: `${features.FILE_STORAGE}-${WRITE}`,
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        exact: true,
        breadCrumbKey: 'Edit Document',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/ring-group',
    component: RingGroup,
    resource: `${features.RING_GROUP}-${READ}`,
    exact: true,
    breadCrumbKey: 'Ring Group',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: AddRingGroup,
        resource: `${features.RING_GROUP}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Add New Ring Group',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: AddRingGroup,
        simplifiedPath: 'edit',
        resource: `${features.RING_GROUP}-${READ}`,
        noOfEnteriesToSkipAfterThisEntry: 1,
        exact: true,
        breadCrumbKey: 'Edit Ring Group',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/jobs',
    component: Jobs,
    exact: true,
    resource: `${features.CAREER}-${READ}`,
    breadCrumbKey: 'Jobs',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/applicants/:id',
        component: Applicant,
        resource: `${features.CAREER}-${READ}`,
        exact: true,
        simplifiedPath: 'applicants',
        noOfEnteriesToSkipAfterThisEntry: 1,
        breadCrumbKey: 'Applicant',
        routeType: routeTypes.private,
      },
      {
        path: '/add',
        component: AddJob,
        exact: true,
        resource: `${features.CAREER}-${WRITE}`,
        breadCrumbKey: 'Add New Job',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: AddJob,
        simplifiedPath: 'edit',
        resource: `${features.CAREER}-${WRITE}`,
        noOfEnteriesToSkipAfterThisEntry: 1,
        exact: true,
        breadCrumbKey: 'Edit Job',
        routeType: routeTypes.private,
      },
      {
        path: '/apply/:id',
        component: AddApplicant,
        exact: true,
        resource: `${features.CAREER}-${READ}`,
        breadCrumbKey: 'Add New Applicant',
        simplifiedPath: 'apply',
        noOfEnteriesToSkipAfterThisEntry: 1,
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/profit-center',
    component: ProfitCenter,
    exact: true,
    resource: `${features.PROFIT_CENTER}-${READ}`,
    breadCrumbKey: 'Profit Center',
    routeType: routeTypes.private,

    nestedRoutes: [
      {
        path: '/add',
        component: AddProfitCenter,
        exact: true,
        resource: `${features.PROFIT_CENTER}-${WRITE}`,
        breadCrumbKey: 'Add New Profit Center',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: AddProfitCenter,
        resource: `${features.PROFIT_CENTER}-${WRITE}`,
        simplifiedPath: 'edit',
        noOfEnteriesToSkipAfterThisEntry: 1,
        exact: true,
        breadCrumbKey: 'Edit Profit Center',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/groups',
    component: Groups,
    resource: `${features.GROUP}-${READ}`,
    exact: true,
    breadCrumbKey: 'Groups',
    routeType: routeTypes.private,
    nestedRoutes: [
      {
        path: '/add',
        component: AddGroup,
        resource: `${features.GROUP}-${WRITE}`,
        exact: true,
        breadCrumbKey: 'Add New Group',
        routeType: routeTypes.private,
      },
      {
        path: '/edit/:id',
        component: AddGroup,
        simplifiedPath: 'edit',
        resource: `${features.GROUP}-${WRITE}`,
        noOfEnteriesToSkipAfterThisEntry: 1,
        exact: true,
        breadCrumbKey: 'Edit Group',
        routeType: routeTypes.private,
      },
    ],
  },
  {
    path: '/access-denied',
    component: AccessDenied,
    exact: true,
    resource: nonFeatures.ACCESS_DENIED,
    breadCrumbKey: 'Access Denied',
    routeType: routeTypes.private,
  },
];
