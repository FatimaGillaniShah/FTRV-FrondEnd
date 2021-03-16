import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router';
import { AddUsefulLinkPage } from '../../components/pages/addUsefulLink';
import { Toast } from '../../utils/helper';

function AddUsefulLink() {
  const history = useHistory();
  const handleSubmit = () => {
    Toast.fire({
      icon: 'success',
      title: 'Link saved successfully',
    });
    history.push('/useful-links');
  };

  return (
    <>
      <Helmet>
        <title>Useful Links</title>
      </Helmet>
      <AddUsefulLinkPage onHandleSubmit={handleSubmit} />
    </>
  );
}

export default memo(AddUsefulLink);
