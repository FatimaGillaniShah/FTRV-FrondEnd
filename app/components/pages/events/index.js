import React, { memo } from 'react';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs/index';
import WrapInCard from '../../layout/wrapInCard';
import { EventCalendar } from './calendar';

export function EventsPage() {
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <EventCalendar />
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(EventsPage);
