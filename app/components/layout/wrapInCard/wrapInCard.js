import { Grid, Card } from '@material-ui/core';
import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(() => ({
  root: {
    flex: 1,
    display: 'flex',
  },
}));
export default function WrapInCard() {
  const classes = useStyles();
  return (
    <>
      <Grid container xs={12} direction="column" className={classes.root}>
        <Card></Card>
      </Grid>
    </>
  );
}
