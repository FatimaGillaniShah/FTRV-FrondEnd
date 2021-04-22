import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import moment from 'moment';
import { H5, BodyTextLarge, BodyTextSmall } from '../../typography';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';

const useStyles = makeStyles(() => ({
  imageView: {
    width: '280px',
    height: '180px',
    borderRadius: '6px',
  },
}));

function Blog({ title, thumbnail, shortText, user, createdAt }) {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const classes = useStyles();
  const pattern = new Date(createdAt);
  const creationDate = moment(pattern).format('MMMM d, YYYY');
  return (
    <Box
      display="flex"
      flexDirection={['column', 'column', 'row', 'row']}
      mt={6}
      mb={8}
    >
      <Box width={[1, 1, 1, '22%']} mt={3}>
        {' '}
        <Avatar
          variant="square"
          src={`${process.env.API_ASSETS_URL}${thumbnail}`}
          className={classes.imageView}
        />
      </Box>
      <Box width={[1, '75%']}>
        <Box display="flex" flexDirection="row" mt={0.5}>
          <Box width={[1, 1 / 2]} mt={2}>
            <H5>{title}</H5>
          </Box>
          {role === ROLES.ADMIN && (
            <Box width={[1, 1 / 2]} display="flex" justifyContent="flex-end">
              <IconButton>
                <EditIcon color="secondary" />
              </IconButton>
              <IconButton>
                <DeleteIcon color="error" />
              </IconButton>
            </Box>
          )}
        </Box>
        <Box>
          <BodyTextLarge color="grey">
            {' '}
            {`${shortText}${' '}${'....'}`}
          </BodyTextLarge>
        </Box>
        <Box display="flex" flexDirection="column" mt={8}>
          <Box>
            <BodyTextLarge fontWeight="fontWeightMedium" color="grey">
              {`${user.firstName}${' '}${user.lastName}`}
            </BodyTextLarge>
          </Box>
          <Box mt={1}>
            <BodyTextSmall color="grey">{creationDate}</BodyTextSmall>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
Blog.propTypes = {
  item: PropTypes.object,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  shortText: PropTypes.string,
  user: PropTypes.object,
  createdAt: PropTypes.string,
};

Blog.defaultProps = {
  item: {},
  title: '',
  thumbnail: '',
  shortText: '',
  user: {},
  createdAt: '',
};

export default memo(Blog);
