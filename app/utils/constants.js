export const STYLE_CONSTANTS = {
  HEADER_WIDTH: '5rem',
  menuWidth: '5rem',
};

export const FILE_ACCEPT_TYPES = {
  imageFiles: 'image/x-png,image/jpeg,image/jpg',
};
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 100];
export const PAGE_SIZE = 10;
export const LOCAL_STORAGE_ENTRIES = { user: 'user' };
export const MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS = 10; // Mb
export const MIN_UPLOADABLE_IMAGE_SIZE_IN_MBS = 0.1; // Mb
export const MIN_UPLOADABLE_FILE_SIZE_IN_MBS = 0; // Mb
export const MAX_UPLOADABLE_FILE_SIZE_IN_MBS = 10; // Mb
export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};
export const ANNOUNCEMENT_STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};

export const POLL_OPTIONS_LIMIT = 4;

export const APIS = {
  LOGIN: 'users/login',
  GOOGLE_LOGIN: 'users/googleLogin',
  USERS_LIST: '/users',
  USERS_DELETE: '/users/deleteUsers',
  USERS: '/users',
  BIRTHDAYS: '/users/birthday',
  QUOTE: '/quote',
  FILE_UPLOAD: 'users/upload',
  RETRIEVE_LINKS: '/usefulLinks',
  CREATE_LINK: '/usefulLinks',
  GET_LINK: '/usefulLinks',
  UPDATE_LINK: '/usefulLinks',
  DELETE_LINK: '/usefulLinks/deleteLinks',
  ANNOUNCEMENT: '/announcements',
  ANNOUNCEMENT_DELETE: '/announcements/deleteAnnouncements',
  GET_ANNOUNCEMENTS: '/announcements/userAnnouncements',
  CEO_MESSAGE: '/ceo',
  CREATE_EVENT: '/events',
  EVENTS: '/events',
  DELETE_EVENTS: '/events',
  GET_EVENT: '/events',
  UPDATE_EVENTS: '/events',
  BLOG: '/blogs',
  CREATE_BLOG: '/blogs',
  UPDATE_BLOG: '/blogs',
  GET_BLOG: '/blogs',
  DELETE_BLOG: '/blogs',
  CREATE_LINK_CATEGORY: '/linkCategories',
  GET_LINK_CATEGORY: '/linkCategories',
  UPDATE_LINK_CATEGORY: '/linkCategories',
  CATEGORY: '/linkCategories',
  GET_USEFUL_LINKS: '/usefulLinks',
  DELETE_CATEGORY: '/linkCategories',
  GET_CATEGORIES: '/linkCategories',
  LOCATIONS: '/locations',
  CREATE_LOCATION: '/locations',
  GET_LOCATION: '/locations',
  UPDATE_LOCATION: '/locations',
  DEPARTMENTS: '/departments',
  DELETE_DEPARTMENT: '/departments',
  CREATE_DEPARTMENT: '/departments',
  GET_DEPARTMENT: '/departments',
  UPDATE_DEPARTMENT: 'departments',
};
