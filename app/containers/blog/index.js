import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import BlogListing from '../../components/blogListing';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { getBlogs } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal } from '../../utils/helper';
import { Loading } from '../../components/loading';
import { useDeleteBlog } from '../../hooks/blog';

function Blog() {
  const { data, isLoading } = useQuery(keys.blog, getBlogs);

  const mutation = useDeleteBlog();
  const handleDeleteBlog = (id) => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutation.mutate([id]);
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Blog</title>
        <meta name="ftrv blog listing" content="ftrv blog listing screen" />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLoading ? (
            <Loading />
          ) : (
            <BlogListing
              items={data?.data?.data?.rows}
              onHandleDeleteBlog={handleDeleteBlog}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(Blog);
