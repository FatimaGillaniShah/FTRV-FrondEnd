import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory, useParams } from 'react-router';
import CreateBlogPage from '../../components/pages/createBlog';
import { Toast } from '../../utils/helper';

function CreateBlog() {
  const { id } = useParams();
  const history = useHistory();
  const handleSubmit = (values) => {
    if (values) {
      history.push('/blogs');
      Toast({
        icon: 'success',
        title: `Blog ${id ? 'Updated' : 'Created'}  Successfully`,
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Blog</title>
      </Helmet>
      <CreateBlogPage onHandleSubmit={handleSubmit} id={id} />
    </>
  );
}

export default memo(CreateBlog);
