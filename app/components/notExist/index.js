import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import React from 'react';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { useHistory } from 'react-router';
import { Button } from '../index';
import { navigateTo } from '../../utils/helper';
import { H5, H1, BodyTextLarge } from '../typography';

const useStyles = makeStyles(() => ({
  iconImage: {
    width: '5%',
    height: '5%',
  },
  title: {
    fontSize: '100px',
  },
}));

export function NotExist({ Icon, text, description, title }) {
  const classes = useStyles();
  const history = useHistory();
  return (
    <>
      <Box m={4}>
        <Box flexDirection="column">
          <Box
            display="flex"
            justifyContent="center"
            alignItems="center"
            mb={5}
          >
            <Icon color="secondary" className={classes.iconImage} />
          </Box>
          <Box display="flex" justifyContent="center" alignItems="center">
            <H1 className={classes.title} color="secondary">
              {title}
            </H1>
          </Box>
          <Box mt={4} display="flex" justifyContent="center">
            <H5 fontWeight="fontWeightMedium" color="secondary">
              {text}
            </H5>
          </Box>
          <Box mt={4} display="flex" justifyContent="center">
            <BodyTextLarge fontWeight="fontWeightSmall" color="secondary">
              {description}
            </BodyTextLarge>
          </Box>
          <Box mt={7} mb={18} display="flex" justifyContent="center">
            <Button
              startIcon={<ArrowBackIcon fontSize="small" />}
              variant="contained"
              color="secondary"
              type="button"
              onClick={() => navigateTo(history, '/home')}
            >
              Back To Home
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
}
NotExist.propTypes = {
  description: PropTypes.string,
  Icon: PropTypes.object,
  text: PropTypes.string,
  title: PropTypes.string,
};
export default NotExist;
