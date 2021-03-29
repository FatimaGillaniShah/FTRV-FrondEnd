import { Box } from '@material-ui/core';
import React, { memo } from 'react';
import PropTypes from 'prop-types';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { EventCalendar } from './calendar';
import { H5 } from '../../typography';

export function EventsPage({ eventList }) {
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box pb={7} pt={3}>
          <H5> Events </H5>
        </Box>
        <EventCalendar eventList={eventList} />
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
      start: PropTypes.instanceOf(Date).isRequired,
      end: PropTypes.instanceOf(Date).isRequired,
    })
  ),
};
EventsPage.defaultProps = {
  eventList: [],
};

export default memo(EventsPage);
