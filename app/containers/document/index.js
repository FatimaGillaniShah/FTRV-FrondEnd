import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery, useMutation } from 'react-query';
import {
  updateDocumentOrder,
  getDepartmentDocuments,
} from 'state/queryFunctions';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
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
  const sortOrderMutation = useMutation(updateDocumentOrder);
  const handleSortOrder = (updatedData) => {
    const payload = { updatedData };
    sortOrderMutation.mutate(payload);
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
              onHandleSortOrder={handleSortOrder}
            />
          )}
        </WrapInCard>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(Document);
