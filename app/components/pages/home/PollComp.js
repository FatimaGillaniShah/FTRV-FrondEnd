import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import { Grid, Box } from '@material-ui/core';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Button from '@material-ui/core/Button';
import LinearProgress from '@material-ui/core/LinearProgress';
import { H5, H6, BodyText } from '../../typography';

const BorderLinearProgress = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#00cc99',
  },
}))(LinearProgress);
const BorderLinearProgress2 = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: 'red',
  },
}))(LinearProgress);
const BorderLinearProgress3 = withStyles((theme) => ({
  root: {
    height: 15,
    borderRadius: 5,
  },
  colorPrimary: {
    backgroundColor:
      theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
  },
  bar: {
    borderRadius: 5,
    backgroundColor: '#ffc266',
  },
}))(LinearProgress);

const useStyles = makeStyles((theme) => ({
  spacing: 1,
  paper: {
    padding: '30px',
    textAlign: 'left',
    borderRadius: '5px',
    margin: '5px',
  },
  conPadding: {
    // backgroundColor: "#f2f2f2",
    display: 'flex',
    justifyContent: 'center',
    // height: "100vh",
    // paddingTop:"50px",
    // overflow:"auto",
  },
  fontBold: {
    fontWeight: '900',
  },
  buttonStyleItem: {
    // margin:"20px",
    justifyContent: 'space-evenly',
    marginTop: 'inherit',
    marginBottom: 'inherit',
  },
  buttonStyleItem2: {
    [theme.breakpoints.down('290')]: {
      margin: '10px',
    },
    [theme.breakpoints.between('1260', '1400')]: {
      justifyContent: 'center',
    },
    // marginLeft:"20px",
    // [theme.breakpoints.down('290')]: {
    //   marginLeft:"0px",
    //   marginTop:"10px"
    // },[theme.breakpoints.down('330')]: {
    //   marginLeft:"-70px",
    //   marginTop:"50px"
    // },[theme.breakpoints.only('216')]: {
    //   marginLeft:"-70px",
    //   marginTop:"500px"
    // },
  },
}));

export default function PollComp() {
  const classes = useStyles();

  const [value, setValue] = useState('female');

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <>
      <Grid container className={classes.conPadding}>
        <Grid item xs={12} sm={10}>
          <Paper elevation={2} className={classes.paper}>
            <Box my={3}>
              <H5 color="secondary" fontWeight={600} gutterBottom>
                Poll
              </H5>
            </Box>
            <H6 color="dark" gutterBottom>
              lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo
            </H6>
            <Grid item sx={12} sm={10}>
              <RadioGroup
                aria-label="gender"
                name="gender1"
                value={value}
                onChange={handleChange}
              >
                <FormControlLabel
                  value="option1"
                  control={<Radio />}
                  label={
                    <BodyText color="default"> Option 1: lorem ipsum </BodyText>
                  }
                />
                <FormControlLabel
                  value="option2"
                  control={<Radio />}
                  label={
                    <BodyText color="default"> Option 2: lorem ipsum </BodyText>
                  }
                />
                <FormControlLabel
                  value="option3"
                  control={<Radio />}
                  label={
                    <BodyText color="default"> Option 3: lorem ipsum </BodyText>
                  }
                />
              </RadioGroup>
            </Grid>

            <Box width={1} display="flex" flexDirection={['column', 'row']}>
              <Box
                my={3}
                mr={[0, 3]}
                width={[1, 0.4]}
                justifyContent="center"
                alignItems="center"
              >
                <Button
                  variant="contained"
                  color="primary"
                  style={{ width: '100%' }}
                >
                  Vote
                </Button>
              </Box>
              <Box
                my={3}
                ml={[0, 3]}
                width={[1, 0.6]}
                justifyContent="center"
                alignItems="center"
              >
                <Button variant="contained" style={{ width: '100%' }}>
                  Hide Results
                </Button>
              </Box>
            </Box>
            <Grid item sx={12} sm={10}>
              <Typography variant="body1" component="h2" gutterBottom>
                option 1
              </Typography>
              <BorderLinearProgress variant="determinate" value={40} />
            </Grid>
            <Grid item sx={12} sm={10}>
              <Typography variant="body1" component="h2" gutterBottom>
                option 2
              </Typography>
              <BorderLinearProgress2 variant="determinate" value={30} />
            </Grid>
            <Grid item sx={12} sm={10}>
              <Typography variant="body1" component="h2" gutterBottom>
                option 3
              </Typography>
              <BorderLinearProgress3 variant="determinate" value={20} />
            </Grid>
          </Paper>
        </Grid>
      </Grid>
    </>
  );
}
