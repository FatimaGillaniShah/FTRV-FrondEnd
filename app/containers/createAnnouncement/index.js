import { WrapInCard } from 'components';
import CreateNewAnnouncement from 'components/pages/createAnnouncement';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';

import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';

function CreateAnnouncement() {
  return (
    <>
      <Helmet>
        <title>Create Announcement</title>
        <meta
          name="ftrv create announcement"
          content="ftrv Announcement creation screen"
        />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          <CreateNewAnnouncement formType="add" />
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(CreateAnnouncement);
