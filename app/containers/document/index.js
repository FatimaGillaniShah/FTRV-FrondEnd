import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { getDepartmentDocuments } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Loading } from '../../components/loading';
import DocumentPage from '../../components/pages/documents';

function Document() {
  const { data, isLoading } = useQuery(keys.department, getDepartmentDocuments);
  return (
    <>
      <Helmet>
        <title>Document</title>
        <meta name="ftrv blog listing" content="ftrv blog listing screen" />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLoading ? (
            <Loading />
          ) : (
            <DocumentPage
              data={data?.data?.data?.rows}
              count={data?.data?.data?.count}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(Document);
