import { Box, Button, IconButton } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import { Link } from 'react-router-dom';
import AddIcon from '@material-ui/icons/Add';
import { H5 } from '../../typography';
// import { NewEvent } from './newEvent';
const useStyles = makeStyles(() => ({
  linkStyle: { textDecoration: 'none' },
}));
export const CustomToolbar = ({ label, onNavigate }) => {
  const classes = useStyles();
  // const handleOpenDailogue = () => {
  //   setOpen(true);
  // };

  // const handleCloseDailogue = () => {
  //   setOpen(false);
  // };
  const navigate = (action) => {
    onNavigate(action);
  };
  return (
    <Box
      pb={7}
      display="flex"
      justifyContent={['center', 'space-between']}
      alignItems={['stretch', 'stretch', 'center']}
      flexDirection={['column', 'column', 'row']}
    >
      {/* <NewEvent /> */}
      <Link to="/events/add" className={classes.linkStyle}>
        <Button
          variant="contained"
          color="secondary"
          startIcon={<AddIcon />}
          // onClick={handleOpenDailogue}
        >
          New Event
        </Button>
      </Link>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        pt={[5, 5, 0]}
        mr={[0, 0, 35]}
      >
        <IconButton onClick={() => navigate('PREV')}>
          <ArrowBackIosIcon />
        </IconButton>
        <H5>{label}</H5>
        <IconButton onClick={() => navigate('NEXT')}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>
      <Box />
    </Box>
  );
};

export default memo(CustomToolbar);
