import { Box } from '@material-ui/core';
import React, { memo } from 'react';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { EventCalendar } from './calendar';
import { H5 } from '../../typography';

export function EventsPage() {
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box pb={7} pt={3}>
          <H5> Events </H5>
        </Box>
        <EventCalendar />
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(EventsPage);
