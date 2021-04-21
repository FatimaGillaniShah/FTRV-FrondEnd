import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Avatar, IconButton, Link } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { useHistory } from 'react-router-dom';
import EditIcon from '@material-ui/icons/Edit';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import { H5, BodyTextLarge, BodyTextSmall } from '../../typography';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';

const useStyles = makeStyles(() => ({
  imageView: {
    width: '300px',
    height: '200px',
  },
}));

function Blog({ item: { id, title, thumbnail, shortText, user, createdAt } }) {
  const history = useHistory();
  const classes = useStyles();
  const pattern = /[0-9][0-9][0-9][0-9]-[0-9][0-9]-[0-9][0-9]/gi;
  const creationDate = createdAt?.match(pattern);
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const navigateTo = (url) => {
    history.push(url);
  };
  return (
    <Box
      display="flex"
      flexDirection={['column', 'column', 'row', 'row']}
      mt={8}
      mb={10}
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
        <Box display="flex" flexDirection="row" mt={8}>
          <Box width={[1, 1 / 2]} mt={2}>
            <Link to={() => navigateTo(`/blogs/detail/${id}`)}>
              <H5>{title}</H5>
            </Link>
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
          <BodyTextLarge color="grey">{shortText}</BodyTextLarge>
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
  id: PropTypes.number,
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  shortText: PropTypes.string,
  user: PropTypes.object,
  createdAt: PropTypes.string,
};

Blog.defaultProps = {
  item: {},
  id: null,
  title: '',
  thumbnail: '',
  shortText: '',
  user: {},
  createdAt: '',
};

export default memo(Blog);
