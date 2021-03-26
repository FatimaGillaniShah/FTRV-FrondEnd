import { Box } from '@material-ui/core';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { useStyles } from './style';
import { H6 } from '../typography/index';

export function BirdthdayCard({ item }) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection={['column', 'column', 'column', 'row']}
      justifyContent="space-between"
    >
      <Box
        width="40%"
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box className={classes.backgroundgrid}>
          <Avatar
            alt=""
            className={classes.imgStyle}
            src={`${process.env.API_ASSETS_URL}${item.avatar}`}
          />
        </Box>
        <Box justifyContent="center" display="flex" mt={2}>
          <H6 color="light">{item.fullName}</H6>
        </Box>
      </Box>

      <Box
        width="60%"
        textAlign="center"
        alignItems="center"
        display="flex"
        justifyContent="center"
        className={classes.textBox}
        pt={[3, 3, 3, 0]}
      >
        <H6 color="light" light className={classes.birthdayText}>
          Today is
          <Box>
            <H6 bold color="light" className={classes.inline}>
              {item.firstName}
              {"'s"}
            </H6>
          </Box>
          birthday
        </H6>
      </Box>
    </Box>
  );
}
export default BirdthdayCard;
