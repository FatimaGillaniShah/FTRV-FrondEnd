import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import RingGroup from '../../components/pages/ringGroup';

function RingGroupContainer() {
  const [selected, setSelected] = useState([]);
  const data = [];

  return (
    <>
      <Helmet>
        <title> Ring Group</title>
      </Helmet>

      <RingGroup data={data} selected={selected} setSelected={setSelected} />
    </>
  );
}

export default memo(RingGroupContainer);
