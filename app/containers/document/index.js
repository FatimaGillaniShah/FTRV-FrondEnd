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
  const { data, isLoading } = useQuery(
    keys.documentDepartment,
    getDepartmentDocuments
  );
  const department = data?.data?.data?.rows;
  return (
    <>
      <Helmet>
        <title>Document</title>
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLoading ? <Loading /> : <DocumentPage data={department} />}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(Document);
