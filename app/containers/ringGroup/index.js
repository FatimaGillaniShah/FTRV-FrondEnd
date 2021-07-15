import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Loading } from '../../components/loading';
import RingGroup from '../../components/pages/ringGroup';
import { useDeleteRingGroup } from '../../hooks/ringGroup';
import { getRingGroups } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal } from '../../utils/helper';

function RingGroupContainer() {
  const [selected, setSelected] = useState([]);
  const { data, isLoading: isListLoading } = useQuery(
    keys.ringGroups,
    getRingGroups
  );

  const { mutate, isLoading } = useDeleteRingGroup({
    callbackFn: () => setSelected([]),
  });

  const handleDelete = () => {
    if (!selected.length) {
      return;
    }
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutate(selected);
      }
    });
  };
  return (
    <>
      <Helmet>
        <title> Ring Group</title>
      </Helmet>
      {isListLoading || isLoading ? (
        <Loading />
      ) : (
        <RingGroup
          data={data?.data?.data?.rows}
          selected={selected}
          setSelected={setSelected}
          onHandleDelete={handleDelete}
        />
      )}
    </>
  );
}

export default memo(RingGroupContainer);
