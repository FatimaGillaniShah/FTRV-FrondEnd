import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import { H6 } from '../../typography';
import BoxWithBg from '../../boxWithBg';

const useStyles = makeStyles((theme) => ({
  backgroundgrid: {
    backgroundImage: `url("../../../images/photoBg.png")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '154px 160px',
  },
  customSize: {
    width: '154px',
    height: 'auto',
  },
  textBox: {
    overflowWrap: 'break-word',
  },
  birthdayText: {
    display: 'block',
    [theme.breakpoints.down('sm')]: {
      display: 'flex',
    },
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <BoxWithBg title="Birthdays" bgColor="bgColor.orange">
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
              style={{
                border: '5px solid ',
                borderColor: 'white',
                borderRadius: '50%',
                width: '76px',
                height: '76px',
                // marginLeft: 'min(50px, 10%)',
              }}
              src="https://media.istockphoto.com/photos/pakistan-monument-islamabad-picture-id535695503?k=6&m=535695503&s=612x612&w=0&h=uP8aDK4xlfjk3kEiyr9wwUiuh80UwAiICweFpiBDosk="
              alt="Birthday person"
            ></img>
          </Box>
          <Box justifyContent="center" display="flex" mt={2}>
            <H6 color="light">Common</H6>
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
            Today is
            <H6 bold color="light">
              &nbsp;&nbsp;Common&apos;s&nbsp;&nbsp;
            </H6>
            Birthday!
          </H6>
        </Box>
      </Box>
    </BoxWithBg>
  );
}
