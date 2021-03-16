import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import UsefulLinksPage from '../../components/pages/usefulLinks';
import { Modal } from '../../utils/helper';

function UsefulLinks() {
  const handleDeleteLinks = () => {
    Modal.fire();
  };
  return (
    <>
      <Helmet>
        <title>Useful Links</title>
      </Helmet>
      <UsefulLinksPage onDelete={handleDeleteLinks} />
    </>
  );
}

export default memo(UsefulLinks);
