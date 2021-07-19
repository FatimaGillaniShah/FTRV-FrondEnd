import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { debounce } from 'lodash-es';
import { Loading } from '../../components/loading';
import { useDeleteRingGroup } from '../../hooks/ringGroup';
import { getRingGroups } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal } from '../../utils/helper';
import RingGroup from '../../components/pages/ringGroup';

function RingGroupContainer() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const [fieldFunc, setFieldFunc] = useState();
  const [checked, setChecked] = useState(false);
  const [query, setQuery] = useState({ searchString: '' });
  const [filters, setFilters] = useState();

  const { data, isLoading: isListLoading } = useQuery(
    keys.ringGroups({ query, filters }),
    getRingGroups
  );

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
    if (checked) {
      fieldFunc?.setFormikField('searchString', '');
      setQuery({ searchString: '' });
    }
  }, [checked]);

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
    setChecked(target.checked);
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
          onHandleSearch={handleSearch}
          checked={checked}
          query={query}
          onHandleFilterSearch={handleFilterSearch}
          onClearFilter={onClearFilter}
          onHandleSwitchChange={handleSwitchChange}
          setPage={setPage}
          page={page}
        />
      )}
    </>
  );
}

export default memo(RingGroupContainer);
