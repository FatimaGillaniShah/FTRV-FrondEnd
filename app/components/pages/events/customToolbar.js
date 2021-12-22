import { Box, Button, IconButton, Link } from '@material-ui/core';
import React, { memo } from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import AddIcon from '@material-ui/icons/Add';
import moment from 'moment';
import { H5 } from '../../typography';
import Show from '../../show';
import { parseDate } from '../../../utils/functions';

export const CustomToolbar = ({
  home,
  setEventWindowDate,
  setPagination,
  isWriteAllowed,
}) => ({ onNavigate, label }) => {
  const navigate = (action) => {
    onNavigate(action);
  };
  const handlePrev = (calendarLabel) => {
    setPagination(true);
    const date = parseDate(moment(calendarLabel).subtract(1, 'M'));
    setEventWindowDate(date);
    navigate('PREV');
  };
  const handleNext = (calendarLabel) => {
    setPagination(true);
    const date = parseDate(moment(calendarLabel).add(1, 'M'));
    setEventWindowDate(date);
    navigate('NEXT');
  };
  return (
    <>
      <Show IF={isWriteAllowed && !home}>
        <Box mb={5}>
          <Link href="/events/add" underline="none">
            <Button
              variant="contained"
              color="secondary"
              startIcon={<AddIcon />}
            >
              New Event
            </Button>
          </Link>
        </Box>
      </Show>
      <Box
        display="flex"
        flexDirection="row"
        alignItems="center"
        justifyContent="center"
        bgcolor="secondary.main"
      >
        <IconButton onClick={() => handlePrev(label)}>
          <Box color="text.light">
            <ArrowBackIosIcon />
          </Box>
        </IconButton>
        <H5 color="light">{label}</H5>
        <IconButton onClick={() => handleNext(label)}>
          <Box color="text.light">
            <ArrowForwardIosIcon />
          </Box>
        </IconButton>
      </Box>
      <Box />
    </>
  );
};

export default memo(CustomToolbar);
