// import "./styles.css";
import React from 'react';
import { Box, Grid, Typography, Paper, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotificationComp from './NotificationComp';
import PollComp from './PollComp';
import BirthdayBox from './birthdayBox';
import QuotationBox from './quotationBox';

import CalenderComp from './CalenderComp';
// import { createMuiTheme } from '@material-ui/core/styles';
import { BodyText, H6 } from '../../typography';

const useStyles = makeStyles((theme) => ({
  imgStyle: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute',
    left: '0',
  },
  flexBoxLeft: {
    [theme.breakpoints.down('760')]: {
      // order: '2',
      margin: '5px',
      // [theme.breakpoints.between('750','770')]: {
      //   width:"30%",
      //   }
    },
  },
  flexBoxRight: {
    // [theme.breakpoints.between('750','770')]: {
    //   width:"70%",
    //   }
  },
}));
// const theme = createMuiTheme({
//   palette: {
//     primary: {

//       main: '#e6e6e6',
//     }
//     },
// })
export default function App({ dailyQuote }) {
  const classes = useStyles();
  return (
    <Box
      flexDirection={['column-reverse', 'column-reverse', 'row']}
      display="flex"
      mb={1}
    >
      <Box
        className={classes.flexBoxLeft}
        flexWrap="wrap"
        display="flex"
        width={['100%', '100%', '70%']}
        height="max-content"
      >
        <Box width={1} height="35vh" overflow="hidden" position="relative">
          <img
            className={classes.imgStyle}
            src="https://assets-cdn-interactrv.netdna-ssl.com/funtownrv/images/assets%20frequently%20used/interactive%20mark%20iii.png"
            alt="person"
          ></img>
        </Box>

        <Box
          mt={2}
          p={1}
          flexWrap="wrap"
          display="flex"
          flex={1}
          flexDirection={['column', 'column', 'column', 'row']}
          bgcolor="background.paper"
          justifyContent="center"
        >
          <Box flex={0.5} m={1}>
            <CalenderComp />
          </Box>
          <Box flex={0.5} m={1}>
            <PollComp />
          </Box>
        </Box>
      </Box>

      <Box
        className={classes.flexBoxRight}
        bgcolor="#e6e6e6"
        px={3}
        mb={2}
        width={['100%', '100%', '30%']}
      >
        <Box py={4}>
          {' '}
          <NotificationComp />
        </Box>
        <Box pb={3}>
          <BirthdayBox />
        </Box>
        <Box mb={1} flex="0.7" display="flex">
          <QuotationBox dailyQuote={dailyQuote} />
        </Box>
        <Box mb={1}></Box>
      </Box>
    </Box>
  );
}
