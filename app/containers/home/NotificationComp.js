import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
import NotificationsActiveIcon from '@material-ui/icons/NotificationsActive';
const LINES_TO_SHOW = 2;
const useStyles = makeStyles((theme) => ({
  spacing: 1,
  paper: {
    textAlign: 'center',
    flexDirections: 'row',
    // minWidth: "340px",
    // maxWidth: "640px",
    display: 'inlineBlock',
    // minHeight: "150px",
    // maxHeight: "350px",
    borderRadius: '5px',
    margin: '5px',
  },
  conPadding: {
    // backgroundColor: "#f2f2f2",
    display: 'flex',
    justifyContent: 'center',
    // height: "100vh",
    // alignItems: "center"
  },

  iconStyle: {
    color: 'White',
    fontSize: 50,
    padding: '0.4rem',
    backgroundColor: 'red',
    marginTop: '-15%',
    marginLeft: '13%',
    borderRadius: '5px',
  },
  gridPadding: {
    paddingTop: '20%',
    paddingBottom: '4%',
    [theme.breakpoints.down('290')]: {
      paddingTop: '40%',
    },
  },
  typoStyle: {
    // width: "400px",
    // maxWidth: "90%",
    display: '-webkit-box',
    '-webkit-box-orient': 'vertical',
    '-webkit-line-clamp': LINES_TO_SHOW,
    overflow: 'hidden',
  },
}));

export default function NotificationComp() {
  const classes = useStyles();
  return (
    <>
      <Grid container className={classes.conPadding}>
        <Grid item xs={12}>
          <Paper elevation={0} className={classes.paper}>
            <Grid container>
              <Grid item xs={4}>
                <NotificationsActiveTwoToneIcon className={classes.iconStyle} />
              </Grid>
              <Grid item xs={8} className={classes.gridPadding}>
                <Typography variant="h5" component="h2" gutterBottom>
                  <b>Notification</b>
                </Typography>
                <Typography
                  variant="body1"
                  component="h2"
                  gutterBottom
                  className={classes.typoStyle}
                >
                  The office will be closed
                </Typography>
                <Typography variant="body1" component="h2" gutterBottom>
                  1-05-2222
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
