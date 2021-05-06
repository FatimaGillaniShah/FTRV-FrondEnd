import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useParams } from 'react-router';

function CreateCategory() {
  const { id } = useParams();
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Category</title>
      </Helmet>
      <h1>Category</h1>
    </>
  );
}

export default memo(CreateCategory);
