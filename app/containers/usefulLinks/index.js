import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Loading } from '../../components/loading';
import UsefulLinksPage from '../../components/pages/usefulLinks';
import { useDeleteLink } from '../../hooks/usefulLink';
import { fetchLinks } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal } from '../../utils/helper';
import { headCells } from './columns';

function UsefulLinks() {
  const [selected, setSelected] = useState([]);
  const { data, isLoading } = useQuery(keys.links, fetchLinks, {
    refetchOnWindowFocus: false,
  });
  const mutation = useDeleteLink({
    callbackFn: () => setSelected([]),
  });

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
      {isLoading && <Loading />}
      <UsefulLinksPage
        data={data?.data?.data?.rows}
        selected={selected}
        setSelected={setSelected}
        onDelete={handleDeleteLinks}
        headCells={headCells}
        isLoading={isLoading}
      />
    </>
  );
}

export default memo(UsefulLinks);
