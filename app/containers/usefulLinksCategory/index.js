import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import Swal from 'sweetalert2';
import { Loading } from '../../components/loading';
import UsefulLinksCategoryPage from '../../components/pages/usefulLinkCategory';
import { getLinkCategory } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { useDeleteCategory } from '../../hooks/usefulLinkCategory';
import { Modal } from '../../utils/helper';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';

function UsefulLinksCategory() {
  const isWriteAllowed = usePermission(
    `${features.LINKS}-${PERMISSIONS.WRITE}`
  );
  const { data, isLoading } = useQuery(keys.linkCategory, getLinkCategory);
  const categories = data?.data?.data;
  const mutation = useDeleteCategory();
  const handleDeleteCategory = (id, linksCount) => {
    if (linksCount !== '0') {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: `Unable to delete, category contains ${linksCount} link(s)`,
      });
    } else {
      Modal.fire().then(({ isConfirmed }) => {
        if (isConfirmed) {
          mutation.mutate(id);
        }
      });
    }
  };
  return (
    <>
      <Helmet>
        <title>Useful Links Category</title>
      </Helmet>
      <WrapInBreadcrumbs>
        {isLoading || mutation.isLoading ? (
          <Loading />
        ) : (
          <UsefulLinksCategoryPage
            categories={categories}
            handleDeleteCategory={handleDeleteCategory}
            isWriteAllowed={isWriteAllowed}
          />
        )}
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(UsefulLinksCategory);
