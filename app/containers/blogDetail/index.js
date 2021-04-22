import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import BlogDetailInfo from '../../components/pages/blogDetail';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { Loading } from '../../components/loading';
import { getBlogById } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Toast } from '../../utils/helper';

function BlogDetail() {
  const { id } = useParams();
  const { data, isLoading } = useQuery(keys.getBlog(id), getBlogById, {
    refetchOnWindowFocus: false,
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message || 'Some error occurred',
      });
    },
  });

  return (
    <>
      <Helmet>
        <title>Blog Detail</title>
        <meta name="ftrv blog detail" content="ftrv blog detail screen" />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLoading ? (
            <Loading />
          ) : (
            <BlogDetailInfo
              title={data?.data?.data.title}
              thumbnail={data?.data?.data.thumbnail}
              content={data?.data?.data.content}
              createdAt={data?.data?.data.createdAt}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(BlogDetail);
