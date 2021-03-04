import React from 'react';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  papercustom: {
    backgroundColor: theme.palette.secondary.main,
    textAlign: 'center',
    flexDirections: 'row',
    borderRadius: '5px',
    margin: '5px',
    padding: '20px',
  },
  TypographyStyle: {
    color: 'white',
    textAlign: 'left',
  },
  TypographyHeading: {
    marginLeft: '5px',
    fontWeight: '900',
    marginBottom: '20px',
    textAlign: 'center',
  },
}));
export default function DailyDose() {
  const classes = useStyles();
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography
          variant="h6"
          component="h2"
          className={classes.TypographyHeading}
        >
          Daily dose of motivation!{' '}
        </Typography>
        <Paper elevation={0} className={classes.papercustom}>
          <Typography
            variant="body1"
            gutterBottom
            className={classes.TypographyStyle}
          >
            lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
          </Typography>
        </Paper>
      </Grid>
    </Grid>
  );
}
