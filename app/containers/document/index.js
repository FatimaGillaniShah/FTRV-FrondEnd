import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { getDepartments } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Loading } from '../../components/loading';
import DocumentPage from '../../components/pages/documents';

function Document() {
  const { data, isLoading } = useQuery(keys.departments, getDepartments);
  const departments = data?.data?.data?.rows;

  return (
    <>
      <Helmet>
        <title>Document</title>
        <meta name="ftrv blog listing" content="ftrv blog listing screen" />
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLoading ? <Loading /> : <DocumentPage data={departments} />}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(Document);
