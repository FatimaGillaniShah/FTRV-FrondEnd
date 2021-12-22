import { WrapInCard } from 'components';
import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery, useMutation, useQueryClient } from 'react-query';
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
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';

function Document() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    keys.documentDepartment,
    getDepartmentDocuments,
    {
      cacheTime: 0,
    }
  );

  const department = data?.data?.data?.rows;

  const sortOrderMutation = useMutation(updateDocumentOrder, {
    onSuccess: () => {
      queryClient.invalidateQueries(keys.documentDepartment);
    },
  });
  const isWriteAllowed = usePermission(
    `${features.FILE_STORAGE}-${PERMISSIONS.WRITE}`
  );
  const handleSortOrder = (updatedData) => {
    const payload = { updatedData };
    sortOrderMutation.mutate(payload);
  };
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
      {isLoading || mutation.isLoading ? (
        <Loading />
      ) : (
        <WrapInBreadcrumbs>
          <WrapInCard>
            <DocumentPage
              data={department}
              onHandleSortOrder={handleSortOrder}
              onHandleDelete={handleDelete}
              isWriteAllowed={isWriteAllowed}
            />
          </WrapInCard>
        </WrapInBreadcrumbs>
      )}
    </>
  );
}

export default memo(Document);
