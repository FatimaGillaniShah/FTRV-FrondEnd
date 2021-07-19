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

function RingGroupContainer() {
  const history = useHistory();
  const [selected, setSelected] = useState([]);
  const [alignment, setAlignment] = useState('ring-group');

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
      value: 'ring-group',
      label: 'Ring Group',
    },
  ];
  const handleToggleChange = (event, toggleAlignment) => {
    const alignmentValue = toggleAlignment;
    if (!alignmentValue) {
      setAlignment(alignment);
      navigateTo(history, `/${alignment}`);
    } else {
      setAlignment(alignmentValue);
      navigateTo(history, `/${alignmentValue}`);
    }
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
      {isListLoading || isLoading ? (
        <Loading />
      ) : (
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
      )}
    </>
  );
}
export default memo(RingGroupContainer);
