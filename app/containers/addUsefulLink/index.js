import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router';
import { AddUsefulLinkPage } from '../../components/pages/addUsefulLink';
import { Toast } from '../../utils/helper';
import { data } from './data';

function AddUsefulLink() {
  const history = useHistory();
  const { id } = useParams();
  const [initialValues, setInitialValues] = useState({
    name: '',
    url: '',
  });
  const handleSubmit = () => {
    Toast.fire({
      icon: 'success',
      title: 'Link saved successfully',
    });
    history.push('/useful-links');
  };
  useEffect(() => {
    if (data) {
      setInitialValues(data);
    }
  }, [data]);
  return (
    <>
      <Helmet>
        <title>Useful Links</title>
      </Helmet>
      <AddUsefulLinkPage
        onHandleSubmit={handleSubmit}
        id={id}
        initialValues={initialValues}
      />
    </>
  );
}

export default memo(AddUsefulLink);
