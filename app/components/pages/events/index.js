import { Box } from '@material-ui/core';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { EventCalendar } from './calendar';
import { H5 } from '../../typography';
import Show from '../../show';

export function EventsPage({
  eventList,
  isLoading,
  setEventWindowDate,
  eventWindowDate,
  isWriteAllowed,
  pagination,
  setPagination,
}) {
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box pb={7} pt={3}>
          <H5> Events </H5>
        </Box>
        <Show IF={!isLoading || pagination}>
          <Box height={['60vh', '70vh', '80vh']} width={1}>
            <EventCalendar
              eventList={eventList}
              isWriteAllowed={isWriteAllowed}
              setEventWindowDate={setEventWindowDate}
              eventWindowDate={eventWindowDate}
              setPagination={setPagination}
            />
          </Box>
        </Show>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

EventsPage.propTypes = {
  eventList: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      allDay: PropTypes.bool,
      startDate: PropTypes.instanceOf(Date).isRequired,
      endDate: PropTypes.instanceOf(Date).isRequired,
    })
  ),
};
EventsPage.defaultProps = {
  eventList: [],
};
export default memo(EventsPage);
