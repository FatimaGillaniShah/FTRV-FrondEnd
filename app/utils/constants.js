export const STYLE_CONSTANTS = {
  HEADER_WIDTH: '5rem',
  menuWidth: '5rem',
};

export const FILE_ACCEPT_TYPES = {
  imageFiles: 'image/x-png,image/jpeg,image/jpg',
};
export const ROWS_PER_PAGE_OPTIONS = [5, 10, 25, 100];
export const TABLE_PAGE_SIZE = 10;
export const LIST_PAGE_SIZE = 10;
export const LOCAL_STORAGE_ENTRIES = { user: 'user' };
export const MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS = 10; // Mb
export const MIN_UPLOADABLE_IMAGE_SIZE_IN_MBS = 0.1; // Mb
export const MIN_UPLOADABLE_FILE_SIZE_IN_MBS = 0; // Mb
export const MAX_UPLOADABLE_FILE_SIZE_IN_MBS = 100; // Mb
export const SUPPORTED_FORMATS = [
  'image/jpg',
  'image/jpeg',
  'image/png',
  'image/gif',
];
export const STATUS_CODES = {
  FORBIDDEN: 403,
};

export const ROLES = {
  ADMIN: 'admin',
  USER: 'user',
};

export const PERMISSIONS = {
  READ: 'read',
  WRITE: 'write',
};
export const defaultResources = [
  'BIRTHDAY',
  'BANNER_IMAGE',
  'ANNOUNCEMENT',
  'LOCATION',
  'DEPARTMENT',
  'WORK_ANNIVERSARY',
  'MESSAGE_FROM_CEO',
  'QUOTE',
  'GROUP',
  'RESOURCES',
  'EDUCATION',
];
export const dependentResources = [
  {
    subject: 'CAREER',
    dependent: 'APPLICANT',
    readOnly: false,
  },
  {
    subject: 'LINKS',
    dependent: 'USEFUL_LINKS',
    readOnly: true,
  },
  {
    subject: 'POLLS',
    dependent: 'VOTE',
    readOnly: true,
  },
];
export const READ_ONLY_FEATURES = ['BIRTHDAY', 'WORK_ANNIVERSARY', 'EDUCATION'];
export const STATUS = {
  ACTIVE: 'active',
  INACTIVE: 'inactive',
};
export const CKEDITOR_CUSTOM_CONFIG = {
  placeholder: 'Start by typing content here!',
  toolbar: {
    items: [
      'heading',
      '|',
      'bold',
      'italic',
      'link',
      'bulletedList',
      'numberedList',
      '|',
      'outdent',
      'indent',
      '|',
      'imageUpload',
      'blockQuote',
      'insertTable',
      'mediaEmbed',
      'undo',
      'redo',
    ],
  },
  image: {
    toolbar: ['imageTextAlternative', 'imageStyle:full', 'imageStyle:side'],
  },
  table: {
    contentToolbar: ['tableColumn', 'tableRow', 'mergeTableCells'],
  },
  mediaEmbed: {
    previewsInData: true,
  },
};

export const POLL_OPTIONS_LIMIT = 4;

export const APIS = {
  LOGIN: 'users/login',
  GOOGLE_LOGIN: 'users/googleLogin',
  USERS_DELETE: '/users/deleteUsers',
  USERS: '/users',
  USER_TITLE: '/users/title',
  USERS_BULK_UPDATE: '/users/userBulkUpdate',
  BIRTHDAYS: '/users/birthday',
  QUOTE: '/quote',
  FILE_UPLOAD: 'users/upload',
  LINKS: '/usefulLinks',
  DELETE_LINK: '/usefulLinks/deleteLinks',
  ANNOUNCEMENT: '/announcements',
  ANNOUNCEMENT_DELETE: '/announcements/deleteAnnouncements',
  GET_ANNOUNCEMENTS: '/announcements/userAnnouncements',
  CEO_MESSAGE: '/ceo',
  EVENTS: '/events',
  BLOG: '/blogs',
  CATEGORY: '/linkCategories',
  LOCATIONS: '/locations',
  DEPARTMENTS: '/departments',
  BANNER_IMAGE: 'bannerImage',
  WORK_ANNIVERSARY: '/users/workAnniversary',
  DOCUMENTS: '/documents',
  DOCUMENT_SORT_ORDER: '/documents/updateSortOrder',
  DOCUMENT: '/documents',
  RING_GROUP: '/ringGroups',
  JOB: '/jobs',
  APPLICANT: '/jobApplicant',
  POLL: '/polls',
  VOTE: '/vote',
  PROFIT_CENTER: '/profitCenter',
  RESOURCE: '/resources',
  GROUP: '/groups',
};
export const features = {
  DIRECTORY: 'DIRECTORY',
  BANNER_IMAGE: 'BANNER_IMAGE',
  MESSAGE_FROM_CEO: 'MESSAGE_FROM_CEO',
  PROFIT_CENTER: 'PROFIT_CENTER',
  BLOG: 'BLOG',
  CAREER: 'CAREER',
  EDUCATION: 'EDUCATION',
  FILE_STORAGE: 'FILE_STORAGE',
  LINKS: 'LINKS',
  USEFUL_LINKS: 'USEFUL_LINKS',
  QUOTE: 'QUOTE',
  EVENTS: 'EVENTS',
  POLLS: 'POLLS',
  ANNOUNCEMENT: 'ANNOUNCEMENT',
  BIRTHDAY: 'BIRTHDAY',
  WORK_ANNIVERSARY: 'WORK_ANNIVERSARY',
  RING_GROUP: 'RING_GROUP',
  APPLICANT: 'APPLICANT',
  LOCATION: 'LOCATION',
  GROUP: 'GROUP',
  DEPARTMENT: 'DEPARTMENT',
  VOTE: 'VOTE',
};

export const nonFeatures = {
  HOME: 'HOME',
  PROFILE: 'PROFILE',
  CONFIGURATION: 'CONFIGURATION',
  BANNER_IMAGE: 'BANNER_IMAGE',
  ACCESS_DENIED: 'ACCESS_DENIED',
  NOT_FOUND: 'NOT_FOUND',
};
