import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LayersIcon from '@material-ui/icons/Layers';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PeopleIcon from '@material-ui/icons/People';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import StorageIcon from '@material-ui/icons/Storage';
import { ROLES } from 'utils/constants';

export const menuItems = [
  {
    name: 'members',
    icon: PeopleIcon,
    children: [
      { name: 'Directory', link: '/directory' },
      {
        name: 'Ceo Message',
        link: '/ceo-message',
      },
    ],
  },
  {
    name: 'blog',
    link: '/blogs',
    icon: BorderColorIcon,
  },
  {
    name: 'education',
    link: '/',
    icon: QuestionAnswerIcon,
    // children: [
    //   { name: 'Ceo', link: '/ceo' },
    //   {
    //     name: 'new',
    //     link: '/new',
    //     children: [{ name: 'Ceo', link: '/ceo' }],
    //   },
    // ],
  },
  {
    name: 'career',
    link: '/',
    icon: EmojiEventsIcon,
  },
  {
    name: 'community',
    link: '/',
    icon: LayersIcon,
  },
  {
    name: 'fileStorage',
    link: '/',
    icon: StorageIcon,
  },
  {
    name: 'links',
    link: '/useful-links',
    icon: LinkIcon,
  },
  {
    name: 'events',
    link: '/events',
    icon: CalendarTodayIcon,
    role: [ROLES.USER],
  },
  {
    name: 'settings',
    link: '/',
    icon: BorderColorIcon,
    role: [ROLES.ADMIN],
    children: [
      { name: 'Quote', link: '/quote' },
      {
        name: 'Announcement',
        link: '/announcement',
      },
      { name: 'events', link: '/events' },
    ],
  },
];
