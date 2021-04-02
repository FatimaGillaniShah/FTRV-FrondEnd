export const keys = {
  getUsers: (payload) => ['users', payload],
  getUser: (id) => ['user', id],
  quote: 'quote',
  birthday: 'birthday',
  login: 'login',
  getLinks: 'links',
  getLink: (payload) => ['link', payload],
  getAnnouncementById: (id) => ['announcement', id],
  announcement: 'announcement',
  announcements: 'announcements',
  adminAnnouncements: 'adminAnnouncements',
};
