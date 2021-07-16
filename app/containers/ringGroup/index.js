import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Loading } from '../../components/loading';
import RingGroup from '../../components/pages/ringGroup';
import Show from '../../components/show';
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
      <Show IF={isListLoading}>
        <Loading />
      </Show>
      <Show IF={!isListLoading}>
        <RingGroup
          data={data?.data?.data?.rows}
          selected={selected}
          setSelected={setSelected}
        />
      </Show>
    </>
  );
}

export default memo(RingGroupContainer);
