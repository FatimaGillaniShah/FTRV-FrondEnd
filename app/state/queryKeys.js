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
  locations: 'locations',
  getLocation: (payload) => ['location', payload],
  departments: 'departments',
};
