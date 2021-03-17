import { Box } from '@material-ui/core';
import React from 'react';
import { useStyles } from './style';
import { H6 } from '../typography/index';

export function BirdthdayCard({ item }) {
  const classes = useStyles();
  return (
    <Box
      display="flex"
      flexDirection={['column', 'column', 'column', 'row']}
      justifyContent="space-around"
    >
      <Box
        width={1}
        display="flex"
        justifyContent="center"
        alignItems="center"
        flexDirection="column"
      >
        <Box
          display="flex"
          justifyContent="center"
          className={classes.backgroundgrid}
        >
          <img
            className={classes.imgStyle}
            src={item.imageUrl}
            alt="Birthday person"
          />
        </Box>
        <Box justifyContent="center" display="flex" mt={2}>
          <H6 color="light">{item.name}</H6>
        </Box>
      </Box>

      <Box
        width={1}
        textAlign="center"
        alignItems="center"
        display="flex"
        justifyContent="center"
        className={classes.textBox}
        pt={[3, 3, 3, 0]}
      >
        <H6 color="light" light className={classes.birthdayText}>
          <H6 bold color="light" className={classes.inline}>
            {item.name}&nbsp;
          </H6>
          {item.description}
        </H6>
      </Box>
    </Box>
  );
}
export default BirdthdayCard;
