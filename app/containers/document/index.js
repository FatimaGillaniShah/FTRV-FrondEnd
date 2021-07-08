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
  const { data, isLoading } = useQuery(
    keys.documentDepartment,
    getDepartmentDocuments
  );
  const department = data?.data?.data;
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
      </Helmet>

      <WrapInBreadcrumbs>
        <WrapInCard>
          {isLoading ? (
            <Loading />
          ) : (
            <DocumentPage
              data={department?.rows}
              count={department?.count}
              onHandleDelete={handleDelete}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(Document);
