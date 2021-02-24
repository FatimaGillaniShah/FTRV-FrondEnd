import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import BorderColorIcon from '@material-ui/icons/BorderColor';
import LayersIcon from '@material-ui/icons/Layers';
import LinkIcon from '@material-ui/icons/Link';
import PeopleIcon from '@material-ui/icons/People';
import QuestionAnswerIcon from '@material-ui/icons/QuestionAnswer';
import StorageIcon from '@material-ui/icons/Storage';

export const menuItems = [
  {
    name: 'members',
    link: '/members',
    icon: PeopleIcon,
    children: [
      { name: 'Ceo', link: '/ceo' },
      { name: 'admin', link: '/admin' },
    ],
  },
  {
    name: 'blog',
    link: '/blog',
    icon: BorderColorIcon,
    children: [
      { name: 'Ceo', link: '/ceo' },
      { name: 'Ceo', link: '/ceo' },
      { name: 'Ceo', link: '/ceo' },
      { name: 'Ceo', link: '/ceo' },
      { name: 'Ceo', link: '/ceo' },
      {
        name: 'admin',
        link: '/admin',
        children: [
          { name: 'Ceo', link: '/ceo' },
          { name: 'admin', link: '/admin' },
        ],
      },
    ],
  },
  {
    name: 'education',
    link: '/',
    icon: QuestionAnswerIcon,
    children: [
      { name: 'Ceo', link: '/ceo' },
      { name: 'admin', link: '/admin' },
      {
        name: 'new',
        link: '/new',
        children: [
          { name: 'Ceo', link: '/ceo' },
          { name: 'admin', link: '/admin' },
        ],
      },
    ],
  },
  {
    name: 'career',
    link: '/',
    icon: EmojiEventsIcon,
    children: [
      { name: 'Ceo', link: '/ceo' },
      { name: 'admin', link: '/admin' },
      {
        name: 'admin',
        link: '/admin',
        children: [
          { name: 'Ceo', link: '/ceo' },
          { name: 'admin', link: '/admin' },
          { name: 'Ceo', link: '/ceo' },
          { name: 'admin', link: '/admin' },
        ],
      },
    ],
  },
  {
    name: 'community',
    link: '/',
    icon: LayersIcon,
    children: [
      { name: 'Ceo', link: '/ceo' },
      {
        name: 'admin',
        link: '/admin',
        children: [
          { name: 'Ceo', link: '/ceo' },
          { name: 'admin', link: '/admin' },
          { name: 'Ceo', link: '/ceo' },
          {
            name: 'admin',
            link: '/admin',
            children: [
              { name: 'Ceo', link: '/ceo' },
              { name: 'admin', link: '/admin' },
              { name: 'Ceo', link: '/ceo' },
              { name: 'admin', link: '/admin' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'fileStorage',
    link: '/',
    icon: StorageIcon,
    children: [
      { name: 'Ceo', link: '/ceo' },
      {
        name: 'admin',
        link: '/admin',
        children: [
          { name: 'Ceo', link: '/ceo' },
          { name: 'admin', link: '/admin' },
          { name: 'Ceo', link: '/ceo' },
          { name: 'admin', link: '/admin' },
          { name: 'Ceo', link: '/ceo' },
          { name: 'admin', link: '/admin' },
          { name: 'Ceo', link: '/ceo' },
          { name: 'admin', link: '/admin' },
        ],
      },
    ],
  },
  {
    name: 'links',
    link: '/',
    icon: LinkIcon,
    children: [
      { name: 'Ceo', link: '/ceo' },
      { name: 'admin', link: '/admin' },
    ],
  },
  {
    name: 'settings',
    link: '/',
    icon: BorderColorIcon,

    children: [
      { name: 'Ceo', link: '/ceo' },
      { name: 'admin', link: '/admin' },
    ],
  },
];
