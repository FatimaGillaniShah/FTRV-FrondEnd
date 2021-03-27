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

export default memo(EventsPage);
EventsPage.propTypes = {
  eventList: PropTypes.array,
};
EventsPage.defaultProps = {
  eventList: [],
};
