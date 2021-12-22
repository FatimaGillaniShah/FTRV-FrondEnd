import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useHistory } from 'react-router-dom';
import { useQuery } from 'react-query';
import { debounce } from 'lodash-es';
import { Loading } from '../../components/loading';
import { navigateTo, Modal } from '../../utils/helper';
import { useDeleteRingGroup } from '../../hooks/ringGroup';
import { getRingGroups } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import RingGroup from '../../components/pages/ringGroup';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';

function RingGroupContainer() {
  const history = useHistory();
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [fieldFunc, setFieldFunc] = useState();
  const [filterToggle, setFilterToggle] = useState(false);
  const [query, setQuery] = useState({ searchString: '' });
  const [filters, setFilters] = useState();
  const [alignment, setAlignment] = useState('ring-group');

  const isWriteAllowed = usePermission(
    `${features.RING_GROUP}-${PERMISSIONS.WRITE}`
  );

  const { data, isLoading: isListLoading } = useQuery(
    keys.ringGroups({ query, filters }),
    getRingGroups,
    {
      keepPreviousData: true,
    }
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
  useEffect(() => {
    if (filterToggle) {
      fieldFunc?.setFormikField('searchString', '');
      setQuery({ searchString: '' });
    }
  }, [filterToggle]);

  const handleSearch = debounce((e, setFieldValue) => {
    setPage(0);
    setFieldFunc({ setFormikField: setFieldValue });
    setQuery({ searchString: e.target.value });
  }, 500);

  const handleFilterSearch = (values) => {
    setPage(0);
    setFilters(values);
  };
  const onClearFilter = () => {
    setFilters([]);
  };
  const handleSwitchChange = ({ target }) => {
    onClearFilter();
    setFilterToggle(target.checked);
  };
  const initialFilterValues = {
    name: '',
    departmentId: '',
    extension: '',
    locationId: '',
  };
  const rows = data?.data?.data?.rows.map((value) => ({
    ...value,
    department: value.department.name,
    location: value.location.name,
  }));
  return (
    <>
      <Helmet>
        <title> Ring Group</title>
      </Helmet>
      {isListLoading || isLoading ? (
        <Loading />
      ) : (
        <RingGroup
          data={rows}
          loading={isLoading}
          selected={selected}
          setSelected={setSelected}
          onHandleDelete={handleDelete}
          initialFilterValues={initialFilterValues}
          onHandleSearch={handleSearch}
          filterToggle={filterToggle}
          query={query}
          onHandleFilterSearch={handleFilterSearch}
          onClearFilter={onClearFilter}
          onHandleSwitchChange={handleSwitchChange}
          setPage={setPage}
          page={page}
          onHandleToggleChange={handleToggleChange}
          toggleValues={toggleValues}
          alignment={alignment}
          isWriteAllowed={isWriteAllowed}
        />
      )}
    </>
  );
}

export default memo(RingGroupContainer);
