import React from 'react';
import { Card, Grid, Typography, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import NotificationsActiveTwoToneIcon from '@material-ui/icons/NotificationsActiveTwoTone';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import { H5, H6, BodyText } from '../../typography';

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
    fontSize: 65,
    padding: '11%',
    backgroundColor: 'red',
    marginTop: '-15%',
    marginLeft: '13%',
    borderRadius: '5px',
  },
  gridPadding: {
    paddingTop: '10%',
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
      <Box>
        <Box>
          <Card>
            <Box
              textAlign="center"
              flexDirection="row"
              display="flex"
              borderRadius="5px"
              m={2}
            >
              <Box>
                <Box width="40%">
                  <NotificationsNoneIcon className={classes.iconStyle} />
                </Box>

                <Box width="60%" pt={[8, 4]} pb={4}>
                  <>
                    <Box my={3}>
                      <H5 color="dark">Notification</H5>
                    </Box>
                    <BodyText color="dark">The office will be closed</BodyText>
                    <BodyText color="dark"> 1-05-2222</BodyText>
                  </>
                </Box>
              </Box>
            </Box>
          </Card>
        </Box>
      </Box>
    </>
  );
}
