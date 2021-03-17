import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import useStyles from './style';
import { H6, BodyText } from '../typography';

export function AnnouncementNotification() {
  const classes = useStyles();
  return (
    <Box className={classes.mainBox}>
      <Box width={1 / 4} className={classes.notificationBox}>
        <Box className={classes.iconBox}>
          <NotificationsActiveIcon className={classes.icon} />
        </Box>
      </Box>

      <Box className={classes.typographyBox}>
        <Box className={classes.titleBox}>
          <H6 color="dark">Notification</H6>
        </Box>
        <Box>
          <BodyText color="dark" className={classes.description}>
            The office will be closed.
          </BodyText>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(AnnouncementNotification);
