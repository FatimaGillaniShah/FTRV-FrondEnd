export const keys = {
  getUsers: (payload) => ['users', payload],
  getUser: (id) => ['user', id],
  quote: 'quote',
  birthday: 'birthday',
  login: 'login',
  links: 'links',
  getLink: (payload) => ['link', payload],
  getAnnouncementById: (id) => ['announcement', id],
  announcement: 'announcement',
  getAnnouncements: 'announcements',
  ceoMessage: 'ceo',
  announcements: 'announcements',
  adminAnnouncements: 'adminAnnouncements',
  events: 'events',
  getEvent: (payload) => ['event', payload],
  blog: 'blog',
  blogs: 'blogs',
  getBlog: (payload) => ['blog', payload],
  getLinkCategory: (id) => ['link-category', id],
  linkCategory: 'category',
  getCategories: 'categories',
  location: 'locations',
  department: 'departments',
  locations: 'locations',
  getLocation: (payload) => ['location', payload],
  departments: 'departments',
  bannerImage: 'banner-image',
  getDepartments: (id) => ['department', id],
  workAnniversary: 'work-anniversary',
  documents: 'documents',
  documentDepartment: 'document-department',
  getDocument: (id) => ['document', id],
  getRingGroup: (id) => ['ring-group', id],
  ringGroups: (payload) => ['/ringGroups', payload],
  jobs: 'jobs',
  applicant: (id) => ['applicant', id],
};
