import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
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

function Blog({ item }) {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const classes = useStyles();

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
          src={`${process.env.API_ASSETS_URL}${item.thumbnail}`}
          className={classes.imageView}
        />
      </Box>
      <Box width={[1, '75%']}>
        <Box display="flex" flexDirection="row">
          <Box width={[1, 1 / 2]} mt={2}>
            <H5>{item.title}</H5>
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
          <BodyTextLarge color="grey">{item.shortText}</BodyTextLarge>
        </Box>
        <Box mt={3}>
          <BodyTextLarge fontWeight="fontWeightMedium" color="grey">
            {`${item.user.firstName}${' '}${item.user.lastName}`}
          </BodyTextLarge>
          <BodyTextSmall color="grey">{item.createdAt}</BodyTextSmall>
        </Box>
      </Box>
    </Box>
  );
}
// Blog.propTypes = {
//   title: PropTypes.string,
//   shortText: PropTypes.string,
//   shortText: PropTypes.string,
//   thumbnail: PropTypes.string,
//   createdAt: PropTypes.string,
// };

export default memo(Blog);
