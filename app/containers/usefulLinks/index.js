import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Loading } from '../../components/loading';
import UsefulLinksPage from '../../components/pages/usefulLinks';
import { getUsefulLinksByCategoryId } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { useSharedState } from '../../hooks/sharedState';
import { getHeadCells } from './columns';
import { Modal, Toast } from '../../utils/helper';
import { useDeleteLink } from '../../hooks/usefulLink';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';

function UsefulLinks() {
  const [selected, setSelected] = useSharedState(keys.selectedRow, []);
  const [page, setPage] = useState(0);
  const { categoryId } = useParams();
  const isWriteAllowed = usePermission(
    `${features.USEFUL_LINKS}-${PERMISSIONS.WRITE}`
  );
  const { data, isLoading } = useQuery(
    keys.links(categoryId),
    getUsefulLinksByCategoryId,
    {
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
    }
  );
  const mutation = useDeleteLink({
    callbackFn: () => setSelected([]),
  });
  useEffect(() => () => setSelected([]), []);

  const handleDeleteLinks = () => {
    if (!selected.length) {
      return;
    }
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(selected);
      }
    });
  };
  return (
    <>
      <Helmet>
        <title>Useful Links</title>
      </Helmet>
      {isLoading || mutation.isLoading ? (
        <Loading />
      ) : (
        <UsefulLinksPage
          data={data?.data?.data?.rows}
          selected={selected}
          setSelected={setSelected}
          onDelete={handleDeleteLinks}
          getHeadCells={getHeadCells}
          isLoading={isLoading}
          page={page}
          setPage={setPage}
          loading={mutation.isLoading}
          isWriteAllowed={isWriteAllowed}
        />
      )}
    </>
  );
}

export default memo(UsefulLinks);
