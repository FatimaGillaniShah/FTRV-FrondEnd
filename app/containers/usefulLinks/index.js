import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import UsefulLinksPage from '../../components/pages/usefulLinks';
import { Modal } from '../../utils/helper';

function UsefulLinks() {
  const [selected, setSelected] = useState([]);
  const handleDeleteLinks = () => {
    if (!selected.length) {
      return;
    }
    Modal.fire();
  };
  return (
    <>
      <Helmet>
        <title>Useful Links</title>
      </Helmet>
      <UsefulLinksPage
        selected={selected}
        setSelected={setSelected}
        onDelete={handleDeleteLinks}
      />
    </>
  );
}

export default memo(UsefulLinks);
