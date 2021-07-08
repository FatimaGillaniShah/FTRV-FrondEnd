import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { getDepartmentDocuments } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Loading } from '../../components/loading';
import DocumentPage from '../../components/pages/documents';
import { useDeleteDocument } from '../../hooks/document';
import { Modal } from '../../utils/helper';

function Document() {
  const { data, isLoading } = useQuery(keys.department, getDepartmentDocuments);
  const departmentData = data?.data?.data;
  const mutation = useDeleteDocument();
  const handleDelete = (id) => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutation.mutate([id]);
      }
    });
  };

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
              data={departmentData?.rows}
              count={departmentData?.count}
              handleDelete={handleDelete}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(Document);
