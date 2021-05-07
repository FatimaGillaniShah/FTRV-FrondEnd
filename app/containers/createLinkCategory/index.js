import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router';
import CreateLinkCategoryPage from '../../components/pages/createLinkCategory';
import { Toast } from '../../utils/helper';

function CreateLinkCategory() {
  const { id } = useParams();
  const history = useHistory();

  const handleSubmit = (values) => {
    if (values)
      Toast({
        icon: 'success',
        title: `Link Category ${id ? 'Updated' : 'Created'}  Successfully`,
      });
    history.push('/link-categories');
  };
  const initialValues = {
    name: '',
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Link Category</title>
      </Helmet>
      <CreateLinkCategoryPage
        onHandleSubmit={handleSubmit}
        id={id}
        initialValues={initialValues}
      />
    </>
  );
}

export default memo(CreateLinkCategory);
