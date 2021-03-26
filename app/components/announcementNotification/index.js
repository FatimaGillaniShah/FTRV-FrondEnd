import React, { memo, useState } from 'react';
import Box from '@material-ui/core/Box';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
import CancelIcon from '@material-ui/icons/Cancel';
import useStyles from './style';
import { H6, BodyText } from '../typography';

export function AnnouncementNotification() {
  const classes = useStyles();
  const [clicked, setClicked] = useState(true);
  const onClose = () => {
    setClicked(false);
  };

  return (
    <>
      <Box
        width={1}
        height={1}
        py={6}
        pr={2}
        justifyContent="center"
        display="flex"
        className={classes.mainBox}
        style={clicked ? { visibility: 'visible' } : { visibility: 'hidden' }}
      >
        <Box width="0.22" alignSelf="center">
          <Box
            width="0.76"
            display="flex"
            justifyContent="center"
            alignItems="center"
            className={classes.iconBox}
          >
            <NotificationsActiveIcon className={classes.icon} />
          </Box>
        </Box>

        <Box
          width="0.67"
          display="flex"
          flexDirection="column"
          justifyContent="center"
          alignItems="center"
        >
          <Box mb={2}>
            <H6 color="dark">Notification</H6>
          </Box>
          <Box className={classes.textBox}>
            <BodyText color="dark">The office will be closed.</BodyText>
          </Box>
        </Box>
        <Box width="0.02" mb={2}>
          <CancelIcon onClick={onClose} />
        </Box>
      </Box>
    </>
  );
}

export default memo(AnnouncementNotification);
