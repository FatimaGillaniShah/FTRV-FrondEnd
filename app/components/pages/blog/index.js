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
  main: {
    margin: 'auto',
  },
  imageView: {
    width: '80%',
    height: '100%',
  },
}));

function Blog({ title, content, shortText, thumbnail, createdAt }) {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const classes = useStyles();
  return (
    <Box display="flex" flexWrap="wrap">
      <Box
        display="flex"
        flexDirection={['column', 'column', 'row', 'row']}
        mt={5}
        mb={5}
        className={classes.main}
      >
        <Box width={[1, 1, 1, '20%']} mt={3}>
          {' '}
          <Avatar
            variant="square"
            src={thumbnail}
            className={classes.imageView}
          />
        </Box>
        <Box width={[1, '0.78']}>
          <Box display="flex" flexDirection="row">
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
            <BodyTextLarge color="grey">{content}</BodyTextLarge>
          </Box>
          <Box mt={3}>
            <BodyTextLarge fontWeight="fontWeightMedium" color="grey">
              {shortText}
            </BodyTextLarge>
            <BodyTextSmall color="grey">{createdAt}</BodyTextSmall>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
Blog.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  shortText: PropTypes.string,
  thumbnail: PropTypes.string,
  createdAt: PropTypes.string,
};

export default memo(Blog);
