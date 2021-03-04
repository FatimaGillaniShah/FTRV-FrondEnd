import React from 'react';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme) => ({
  outerContainer: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: '5px',
    flex: '1',
  },
  Griditem1: {
    display: 'flex',
    alignItems: 'center',
    margin: '5px',
    flex: '1',
  },
  Griditem2: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '	#FF9200',
    borderRadius: '10px',
    margin: '1px',
    paddingBottom: '1px',
  },

  Griditem3: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'white',
    borderRadius: '10px',
    margin: '1px',
    flex: '1',
  },
  bstyle: {
    // height: "100vh",
    // backgroundColor: "#f2f2f2",
    display: 'flex',
    justifyContent: 'center',
    // alignItems: "center",
    overflow: 'auto',
  },
  imageStyle: {
    border: '5px solid ',
    borderColor: 'white',
    borderRadius: '50%',
    width: '76px',
    height: '76px',
    marginLeft: 'min(50px, 10%)',
  },
  backgroundgrid: {
    backgroundImage: `url("/Group518.png")`,
    backgroundRepeat: 'no-repeat',
    backgroundSize: '154px 160px',
    paddingLeft: '15px',
    paddingTop: '25px',
  },
  imageStyleItem3: {
    border: '5px solid ',
    borderColor: '#00ffff',
    borderRadius: '50%',
    width: '76px',
    height: '76px',
    marginLeft: 'min(50px, 10%)',
  },

  block1Typo: {
    marginLeft: 'min(50px, 20%)',
    color: 'white',
    fontSize: ' 7px/12px',
  },
  block2Typo: {
    color: 'white',
    paddingTop: '30px',
    textAlign: 'center',
    paddingLeft: '10px',
    fontSize: '7px/12px',
    overflowWrap: 'break-word',
  },
  item3Typo: {
    paddingTop:"20px",
    // paddingBottom: '30px',
    textAlign: 'center',
    // paddingRight:"30px",
    paddingLeft: '10px',
    fontSize: '20px/30px',
    overflowWrap: 'break-word',
    marginBottom: '1rem',
  },
  paddTop: {
    // paddingTop: '20px',
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: '1rem',
    // paddingRight:"5px",
    // [theme.breakpoints.down('290')]: {
    //   flexDirection:"column",
    //   alignItems:"center",
    //   // textAlign:"left",
    //   margin:"0px",
    // },
    [theme.breakpoints.between('760', '770')]: {
      flexDirection: 'column',
      alignItems: 'center',
      // textAlign:"left",
      margin: '0px',
    },
  },
  customSize: {
    width: '154px',
    height: '160px',
  },
  fontBold: {
    fontWeight: '1000',
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <Box className={classes.bstyle}>
      <Grid container className={classes.outerContainer}>
        <Grid item xs={12} className={classes.Griditem1}>
          <Typography variant="h6" component="h2" gutterBottom>
            <b>Birthdays</b>
          </Typography>
        </Grid>
        <Grid item xs={12} className={classes.Griditem2}>
          <Grid container className={classes.paddTop}>
            <Grid item sm={6}>
              <Box className={classes.customSize}>
                <Box className={classes.backgroundgrid}>
                  <img
                    className={classes.imageStyle}
                    src="https://media.istockphoto.com/photos/pakistan-monument-islamabad-picture-id535695503?k=6&m=535695503&s=612x612&w=0&h=uP8aDK4xlfjk3kEiyr9wwUiuh80UwAiICweFpiBDosk="
                    alt="Birthday person"
                  ></img>
                </Box>
                <Typography
                  className={classes.block1Typo}
                  // variant="h6"
                  // component="h2"
                  gutterBottom
                >
                  Common
                </Typography>
              </Box>
            </Grid>
            <Grid item sm={6} className={classes.block2Typo}>
              <Typography gutterBottom>
                Today is <Box className={classes.fontBold}>Common's </Box>{' '}
                Birthdays!
              </Typography>
            </Grid>
          </Grid>
        </Grid>

        {/* <Grid item xs={12} className={classes.Griditem3}>
          <Grid container className={classes.paddTop}>
            <Grid item xs={6}>
              <img
                className={classes.imageStyleItem3}
                src="https://media.istockphoto.com/photos/pakistan-monument-islamabad-picture-id535695503?k=6&m=535695503&s=612x612&w=0&h=uP8aDK4xlfjk3kEiyr9wwUiuh80UwAiICweFpiBDosk="
                alt="Birthday person"
              ></img>
            </Grid>
            <Grid item xs={6} className={classes.item3Typo}>
              <Typography component="h2" gutterBottom>
                Edward
              </Typography>
              <Button variant="contained" color="primary">
                feb 21
              </Button>
            </Grid>
          </Grid>
        </Grid> */}
      </Grid>
    </Box>
  );
}
