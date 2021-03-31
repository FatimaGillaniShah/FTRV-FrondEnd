import { Box, Button, IconButton, Link } from '@material-ui/core';
import React, { memo } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import { H5 } from '../../typography';
import { useAuthContext } from '../../../context/authContext';
import { ROLES } from '../../../utils/constants';

export const CustomToolbar = ({ label, onNavigate }) => {
  const navigate = (action) => {
    onNavigate(action);
  };
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  return (
    <Box
      pb={7}
      display="flex"
      justifyContent={[
        'center',
        role === ROLES.ADMIN ? 'space-between' : 'center',
      ]}
      alignItems={['stretch', 'stretch', 'center']}
      flexDirection={['column', 'column', 'row']}
    >
      {role === ROLES.ADMIN && (
        <Link href="/events/add" underline="none">
          <Button variant="contained" color="secondary" startIcon={<AddIcon />}>
            New Event
          </Button>
        </Link>
      )}

      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        pt={[5, 5, 0]}
        mr={[0, 0, role === ROLES.ADMIN ? 35 : 0]}
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
