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
  blogs: 'blogs',
};
