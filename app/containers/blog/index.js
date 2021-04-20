import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import BlogListing from '../../components/blogListing';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { getBlogs } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Loading } from '../../components/loading';

function Blog() {
  const { data, isLoading } = useQuery(keys.blog, getBlogs);
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
            <BlogListing blogs={data?.data?.data?.rows} />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(Blog);
