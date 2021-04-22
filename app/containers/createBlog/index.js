import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { Loading } from '../../components/loading';
import CreateBlogPage from '../../components/pages/createBlog';
import { createBlog } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Toast } from '../../utils/helper';

function CreateBlog() {
  const { id } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();
  const { mutate, isLoading } = useMutation(createBlog, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: `Blog ${id ? 'Updated' : 'Created'}  Successfully`,
      });
      history.push('/blogs');
      queryClient.invalidateQueries(keys.getBlogs);
    },
    onError: ({
      response: {
        data: { message },
      },
    }) =>
      Toast({
        icon: 'error',
        title: message || 'Some error occurred',
      }),
  });
  const handleSubmit = (values) => {
    const formData = new FormData();
    formData.append('title', values.title);
    formData.append('content', values.content);
    formData.append('file', values.file);
    mutate(formData);
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Blog</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <CreateBlogPage onHandleSubmit={handleSubmit} id={id} />
      )}
    </>
  );
}

export default memo(CreateBlog);
