import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Avatar } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { H5, BodyTextSmall, BodyTextLarge } from '../../typography';

const useStyles = makeStyles(() => ({
  imageView: {
    width: '100%',
    height: 'auto',
  },
}));
function BlogDetail({ title, content, thumbnail, createdAt }) {
  const classes = useStyles();

  return (
    <Box ml={3}>
      <Box my={7}>
        <H5> {title} </H5>
        <Box mt={4} mb={6}>
          <BodyTextSmall color="grey" fontWeight="fontWeightMedium">
            {createdAt}
          </BodyTextSmall>
        </Box>
        <Box width={[1, 1, 1, '40%']} mt={2}>
          {' '}
          <Avatar
            variant="square"
            src={thumbnail}
            className={classes.imageView}
          />
        </Box>
        <Box mt={7}>
          <BodyTextLarge fontWeight="fontWeightMedium" color="grey">
            {content}
          </BodyTextLarge>
        </Box>
      </Box>
    </Box>
  );
}
BlogDetail.propTypes = {
  title: PropTypes.string,
  content: PropTypes.string,
  thumbnail: PropTypes.string,
  createdAt: PropTypes.string,
};

export default memo(BlogDetail);