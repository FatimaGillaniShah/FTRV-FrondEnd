import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { Loading } from '../../components/loading';
import { navigateTo, Modal } from '../../utils/helper';
import { useDeleteRingGroup } from '../../hooks/ringGroup';
import { getRingGroups } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import RingGroup from '../../components/pages/ringGroup';
import Show from '../../components/show';

function RingGroupContainer() {
  const history = useHistory();
  const [selected, setSelected] = useState([]);
  const [alignment, setAlignment] = useState('ringGroup');

  const { data, isLoading: isListLoading } = useQuery(
    keys.ringGroups,
    getRingGroups
  );

  const toggleValues = [
    {
      value: 'directory',
      label: 'Directory',
    },
    {
      value: 'ringGroup',
      label: 'Ring Group',
    },
  ];
  const handleToggleChange = (event, toggleAlignment) => {
    const alignmentValue = toggleAlignment;
    if (!alignment) {
      setAlignment(alignment);
      navigateTo(history, '/directory');
    }
    if (alignmentValue === 'directory') {
      navigateTo(history, '/directory');
    } else if (alignmentValue === 'ringGroup') {
      navigateTo(history, '/ring-group');
    }
    setAlignment(alignmentValue);
  };
  const { mutate, isLoading } = useDeleteRingGroup({
    callbackFn: () => setSelected([]),
  });

  const handleDelete = () => {
    if (selected.length) {
      Modal.fire().then(({ isConfirmed }) => {
        if (isConfirmed) {
          mutate(selected);
        }
      });
    }
  };
  const initialFilterValues = {
    name: '',
    departmentId: '',
    extension: '',
    locationId: '',
  };
  return (
    <>
      <Helmet>
        <title> Ring Group</title>
      </Helmet>
      <Show IF={isListLoading || isLoading}>
        <Loading />
      </Show>
      <RingGroup
        data={data?.data?.data?.rows}
        selected={selected}
        setSelected={setSelected}
        onHandleDelete={handleDelete}
        initialFilterValues={initialFilterValues}
        onHandleToggleChange={handleToggleChange}
        toggleValues={toggleValues}
        alignment={alignment}
      />
    </>
  );
}
export default memo(RingGroupContainer);
