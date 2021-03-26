import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import EditUserInfo from '../../components/pages/createAnnouncement';

function EditAnnouncement() {
  return (
    <>
      <Helmet>
        <title>Edit Announcement</title>
        <meta
          name="updateAnnouncement"
          content="ftrv - update announcement data"
        />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          <EditUserInfo formType="edit" />
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}
export default memo(EditAnnouncement);
