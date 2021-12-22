import React, { memo, useEffect } from 'react';
import Box from '@material-ui/core/Box';
import Collapse from '@material-ui/core/Collapse';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import CancelIcon from '@material-ui/icons/Cancel';
import useStyles from './style';
import { H6, BodyText } from '../typography';
import { useAuthContext } from '../../context/authContext';
import { colors } from '../../theme/colors';
import Show from '../show';

export function AnnouncementNotification({ item }) {
  const { permission, title, description } = item;
  let notificationBackgroundColor;
  if (item.priority === 'high') {
    notificationBackgroundColor = colors.red;
  } else if (item.priority === 'medium') {
    notificationBackgroundColor = colors.orange;
  } else if (item.priority === 'low') {
    notificationBackgroundColor = colors.green;
  }
  const [isNotificationClosed, setIsNotificationClosed] = React.useState(true);
  const classes = useStyles();
  const { user, setUser } = useAuthContext();
  const closedAnnouncement = (user && user.announcement) || [];

  const onClose = () => {
    closedAnnouncement.push(item);
    setUser({ ...user, announcement: closedAnnouncement });
  };
  useEffect(() => {
    setIsNotificationClosed(true);
  }, [item]);
  return (
    <>
      <Collapse
        in={isNotificationClosed}
        onExited={onClose}
        timeout={{ exit: 500 }}
      >
        <Box
          width={1}
          height={1}
          p={2}
          mt={1}
          justifyContent="center"
          display="flex"
          className={!permission ? classes.mainBox : classes.permissionBox}
        >
          <Box
            width="0.22"
            mt={permission ? 1.5 : 0}
            {...(!permission && { alignSelf: 'center' })}
          >
            <Box
              width="0.67"
              display="flex"
              justifyContent="center"
              alignItems={!permission ? 'center' : ''}
              bgcolor={notificationBackgroundColor}
              className={classes.iconBox}
            >
              <NotificationsActiveIcon
                className={!permission ? classes.icon : classes.permissionIcon}
              />
            </Box>
          </Box>
          <Box
            alignItems={!permission ? 'center' : ''}
            width="0.67"
            display="flex"
            flexDirection="column"
            justifyContent="center"
          >
            <Box mb={permission ? 2 : 0}>
              <H6 color="dark">{title}</H6>
            </Box>
            <Box className={classes.textBox}>
              <BodyText color="dark">{description}</BodyText>
            </Box>
          </Box>

          <Show IF={!permission}>
            <Box width="2%" mb={2}>
              <CancelIcon
                className={classes.closeAnnouncement}
                onClick={() => setIsNotificationClosed(!isNotificationClosed)}
              />
            </Box>
          </Show>
        </Box>
      </Collapse>
    </>
  );
}

export default memo(AnnouncementNotification);
