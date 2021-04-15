import React from 'react';
import Box from '@material-ui/core/Box';
import { Avatar, IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { H5, BodyTextLarge, BodyTextSmall } from '../../typography';
import blog1 from '../../../images/blog1.jpeg';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';
import { colors } from '../../../theme/colors';

const useStyles = makeStyles(() => ({
  imageView: {
    width: '80%',
    height: '100%',
  },
  textColor: {
    color: colors.grey,
  },
}));

export default function Blog() {
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
      >
        <Box width={[1, 1, 1, '20%']} mt={3}>
          {' '}
          <Avatar variant="square" src={blog1} className={classes.imageView} />
        </Box>
        <Box width={[1, '0.78']}>
          <Box display="flex" flexDirection="row">
            <Box width={[1, 1 / 2]} mt={2}>
              <H5>12 Reasons to Celebrate Life</H5>
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
            <BodyTextLarge className={classes.textColor}>
              If you’re in the market for a toy hauler that promises to make you
              feel at home and offers room for all of your favorite toys, look
              no further than the impressive Stryker from Cruiser. You’ll love
              how you get everything you need to feel at home, without
              compromising on things like quality or a spacious garage If you’re
              in the market for a toy hauler that promises to make you feel at
              home and offers room for all of your favorite toys, look no
              further than the impressive Stryker from Cruiser....
            </BodyTextLarge>
          </Box>
          <Box mt={3}>
            <BodyTextLarge
              className={classes.textColor}
              fontWeight="fontWeightMedium"
            >
              Alex Smith
            </BodyTextLarge>
            <BodyTextSmall className={classes.textColor}>
              3 hours ago
            </BodyTextSmall>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
