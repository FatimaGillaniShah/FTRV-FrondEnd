import BorderColorIcon from '@material-ui/icons/BorderColor';
import LinkIcon from '@material-ui/icons/Link';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import PeopleIcon from '@material-ui/icons/People';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import DescriptionIcon from '@material-ui/icons/Description';
import WorkOutlinedIcon from '@material-ui/icons/WorkOutlined';
import BusinessCenterIcon from '@material-ui/icons/BusinessCenter';
import { features } from '../../../utils/constants';

export const menuItems = [
  {
    name: 'members',
    icon: PeopleIcon,
    children: [
      { name: 'directory', link: '/directory', slug: features.DIRECTORY },
      {
        name: 'message from ceo',
        slug: features.MESSAGE_FROM_CEO,
        link: '/ceo-message',
      },
    ],
  },
  {
    name: 'profit center',
    icon: BusinessCenterIcon,
    slug: features.PROFIT_CENTER,
    link: '/profit-center',
  },
  {
    name: 'blog',
    link: '/blogs',
    slug: features.BLOG,
    icon: BorderColorIcon,
  },
  {
    name: 'education',
    slug: features.EDUCATION,
    link: 'https://funtownrv.trainualapp.com/',
    icon: QuestionAnswerIcon,
    externalLink: true,
  },
  {
    name: 'career',
    slug: features.CAREER,
    link: '/jobs',
    icon: WorkOutlinedIcon,
  },
  {
    name: 'file storage',
    link: '/documents',
    slug: features.FILE_STORAGE,
    icon: DescriptionIcon,
  },
  {
    name: 'links',
    link: '/link-categories',
    slug: features.LINKS,
    icon: LinkIcon,
  },
  {
    name: 'events',
    link: '/events',
    slug: features.EVENTS,
    icon: CalendarTodayIcon,
  },
  {
    name: 'settings',
    icon: BorderColorIcon,
    children: [
      { name: 'quote', link: '/quote', slug: features.QUOTE },
      { name: 'polls', link: '/polls', slug: features.POLLS },
      {
        name: 'announcement',
        link: '/announcement',
        slug: features.ANNOUNCEMENT,
      },
      {
        name: 'configuration',
        link: '/',
        children: [
          { name: 'location', link: '/locations', slug: features.LOCATION },
          {
            name: 'department',
            link: '/departments',
            slug: features.DEPARTMENT,
          },
          { name: 'groups', link: '/groups', slug: features.GROUP },
        ],
      },
    ],
  },
];
