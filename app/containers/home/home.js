// import "./styles.css";
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import BirthdayComp from './BirthdayComp';
import CalenderComp from './CalendarComp';
import DailyDose from './DailyDoseComp';
import NotificationComp from './NotificationComp';
import PollComp from './PollComp';

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: 'flex',
    height: '100vh',
    // backgroundColor: "blue",

    // overflow: 'auto',
    // [theme.breakpoints.down('sm')]: {
    //   // backgroundColor: 'red',
    //   // flexDirection:"row-reverse",
    //   oder:"1"
    // },
  },
  gridItem1: {
    // backgroundColor:"red",
    order: '1',
    [theme.breakpoints.down('xs')]: {
      // backgroundColor: 'red',
      // flexDirection:"row-reverse",
      order: '2',
    },
  },
  gridItem2: {
    [theme.breakpoints.down('xs')]: {
      // backgroundColor: 'red',
      // flexDirection:"row-reverse",
      order: '1',
    },
    [theme.breakpoints.between('760', '1025')]: {
      // flex:"1",
      height: '105%',
    },
    //   [theme.breakpoints.only('768')]: {
    //     // flex:"1",
    //     // justifyContent:"initial",
    //     // marginTop:"20px",
    //     height:"100vh"
    //  },
    order: '2',
    display: 'flex',
    backgroundColor: '#e6e6e6',
    justifyContent: 'space-around',
    paddingBottom: '35px',
    paddingTop: '35px',
  },
  gridItem1Item1: {
    // backgroundColor:"blue",
    margin: '10px',
  },
  gridItem1Item2: {
    display: 'flex',
    backgroundColor: 'white',
    //  justifyContent:"space-around",
    //  [theme.breakpoints.between('760', '2200')]: {
    //   backgroundColor: 'red',
    // },
  },
  gridItem1Item2Item1: {
    //  backgroundColor:"blue",
    margin: '10px',
    padding: '10px',
  },
  gridItem1Item2Item2: {
    // backgroundColor:"purple",
    margin: '10px',
  },
  notification: {
    margin: '20px',
  },
  birthday: {
    margin: '20px',
  },
  paper: {
    padding: '5px',
    // textAlign:"left",
    // borderRadius: "1px",
    // marginBottom: "1px",
    // borderBottom:"1px solid",

    // box-shadow: -1px 6px 12px -3px #000000;
  },
  imageStyle: {
    objectFit: 'cover',
    width: '100%',
    height: '40vh',
    // position:"relative"
  },
  gridItem1Item2Container: {
    justifyContent: 'center',
  },
}));
export default function App() {
  const classes = useStyles();
  return (
    <Grid container className={classes.outerContainer}>
      <Grid item xs={12} sm={7} lg={8} className={classes.gridItem1}>
        <Grid item xs={12} className={classes.gridItem1Item1}>
          <img
            className={classes.imageStyle}
            src="https://www.funtownrv.com/blog/wp-content/uploads/sites/8/2017/04/Forest-River-Wildwood-X-Lite-Travel-Trailer.jpg"
            alt="person"
          ></img>
        </Grid>

        <Grid item xs={12} className={classes.gridItem1Item2}>
          <Grid container className={classes.gridItem1Item2Container}>
            <Grid item lg={5} className={classes.gridItem1Item2Item1}>
              <CalenderComp />
              {/* <PollComp/> */}
            </Grid>
            <Grid item lg={5} className={classes.gridItem1Item2Item2}>
              <PollComp />
            </Grid>
          </Grid>
        </Grid>
      </Grid>

      <Grid item xs={12} sm={5} lg={4} className={classes.gridItem2}>
        <Grid container>
          <Grid item xs={12} className={classes.notification}>
            <NotificationComp />
          </Grid>
          <Grid item xs={12} className={classes.birthday}>
            <BirthdayComp />
          </Grid>
          <Grid item xs={12} className={classes.birthday}>
            <DailyDose />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}
