import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import NotificationIcon from '@material-ui/icons/NotificationImportant';
import { Typography } from '@material-ui/core';
import useStyles from './style';

export function AnnouncementNotification() {
  const classes = useStyles();
  return (
    <Box className={classes.mainBox}>
      <Box width={1 / 4} className={classes.notificationBox}>
        <Box width={1 / 2}></Box>
        <Box width={1 / 2} className={classes.iconBox}>
          <NotificationIcon className={classes.icon} />
        </Box>
      </Box>

      <Box width={1 / 2} className={classes.typographyBox}>
        <Box className={classes.titleBox}>
          <Typography className={classes.title}>Notification</Typography>
        </Box>
        <Box>
          <Typography className={classes.description}>
            {' '}
            The office will be closed.
          </Typography>
        </Box>
      </Box>
    </Box>
  );
}

export default memo(AnnouncementNotification);
