import { Box } from '@material-ui/core';
import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import { H6 } from '../typography/index';
import { useStyles } from '../layout/rightInfoPanel/style';

export function WorkAnniversaryCard({ item }) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection={['column', 'column', 'column', 'row']}
      justifyContent="space-between"
    >
      <Box
        width={[1, 1, 1, '40%']}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box className={classes.avatarGrid}>
          <Avatar alt="" className={classes.avatar} src={item.avatar} />
        </Box>
        <Box justifyContent="center" display="flex" textAlign="center">
          <H6 color="light">{item.fullName}</H6>
        </Box>
      </Box>
      <Box
        width={[1, 1, 1, '60%']}
        textAlign="center"
        alignItems="center"
        display="flex"
        justifyContent="center"
        className={classes.cardText}
        pt={[3, 3, 3, 0]}
      >
        <H6>
          Congratulations
          <Box display={['inline', 'inline', 'inline', 'block']}>
            <H6 bold color="light" className={classes.personName}>
              &nbsp;{item.firstName}&nbsp;
            </H6>
          </Box>
          on completing {item.years} year(s) with FTRV.
        </H6>
      </Box>
    </Box>
  );
}
export default WorkAnniversaryCard;
