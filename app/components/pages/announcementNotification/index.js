/**
 *
 * login
 *
 */

import React, { memo } from 'react';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Paper from '@material-ui/core/Paper';
import EmailIcon from '@material-ui/icons/Email';
import LockIcon from '@material-ui/icons/Lock';
import Button from '@material-ui/core/Button';
import { Form, Formik } from 'formik';
import Alert from '@material-ui/lab/Alert';
import { Input } from '../../index';
import { loginSchema } from '../../../containers/login/schema';
import NotificationIcon from '@material-ui/icons/NotificationImportant';
import useStyles from './style';

export function AnnouncementNotification() {
  const classes = useStyles();
  return (
    <Box className={classes.mainBox}>
      <Box width={1 / 3} className={classes.notificationBox}>
        <NotificationIcon className={classes.icon}/>
      </Box>

      <Box width={1 / 2} className={classes.typographyBox}>
          <Box>ffdf</Box>
          <Box>dfdff</Box>
      </Box>
    </Box>
  );
}

export default memo(AnnouncementNotification);
