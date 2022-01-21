import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import moment from 'moment';
import PropTypes from 'prop-types';
import { BodyTextLarge, BodyTextSmall } from '../../typography';

function BlogCreatorInfo({ user, createdAt }) {
  const date = new Date(createdAt);
  const creationDate = moment(date).format('MMMM DD, YYYY');
  const creatorName = user?.firstName
    ? `${user.firstName}${' '}${user.lastName}`
    : '';

  return (
    <>
      <Box>
        <BodyTextLarge fontWeight="fontWeightMedium" color="grey">
          {creatorName}
        </BodyTextLarge>
      </Box>
      <Box mt={1} mb={5}>
        <BodyTextSmall color="grey">{creationDate}</BodyTextSmall>
      </Box>
    </>
  );
}

BlogCreatorInfo.propTypes = {
  user: PropTypes.object,
  createdAt: PropTypes.string,
};
export default memo(BlogCreatorInfo);
