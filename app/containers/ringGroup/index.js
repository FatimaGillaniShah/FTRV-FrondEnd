import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Loading } from '../../components/loading';
import RingGroup from '../../components/pages/ringGroup';
import { getRingGroups } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';

function RingGroupContainer() {
  const [selected, setSelected] = useState([]);
  const { data, isLoading: isListLoading } = useQuery(
    keys.ringGroups,
    getRingGroups
  );

  return (
    <>
      <Helmet>
        <title> Ring Group</title>
      </Helmet>
      {isListLoading ? (
        <Loading />
      ) : (
        <RingGroup
          data={data?.data?.data?.rows}
          selected={selected}
          setSelected={setSelected}
        />
      )}
    </>
  );
}

export default memo(RingGroupContainer);
