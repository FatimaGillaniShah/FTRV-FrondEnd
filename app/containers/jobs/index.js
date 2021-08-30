import React, { memo, useEffect, useState } from 'react';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { debounce } from 'lodash';
import { Loading } from '../../components/loading';
import { getJobs } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal } from '../../utils/helper';
import { useDeleteJob } from '../../hooks/job';
import Jobs from '../../components/pages/jobs';

function JobsContainer() {
  const [selected, setSelected] = useState([]);
  const [filters, setFilters] = useState();
  const [filterToggle, setFilterToggle] = useState(false);
  const [fieldFunc, setFieldFunc] = useState();
  const [query, setQuery] = useState({ searchString: '' });
  const [page, setPage] = useState(0);
  const { data, isLoading: isListLoading } = useQuery(
    keys.getJobs({
      query,
      filters,
    }),
    getJobs,
    {
      keepPreviousData: true,
    }
  );

  const rows = data?.data?.data?.rows.map((value) => ({
    ...value,
    department: value.department.name,
    location: value.location.name,
    expiryDate: moment(value.expiryDate).format('MM-DD-YYYY'),
  }));

  useEffect(() => {
    if (filterToggle) {
      fieldFunc?.setFormikField('searchString', '');
      setQuery({ searchString: '' });
    }
  }, [filterToggle]);

  const initialFilterValues = {
    title: '',
    departmentId: '',
    locationId: '',
  };

  const { mutate, isLoading } = useDeleteJob({
    callbackFn: () => setSelected([]),
  });
  const onClear = () => {
    setFilters([]);
  };
  const handleFilterSearch = (values) => {
    setPage(0);
    setFilters(values);
  };
  const handleSwitchChange = ({ target }) => {
    onClear();
    setFilterToggle(target.checked);
  };

  const handleSearch = debounce((e, setFieldValue) => {
    setPage(0);
    setFieldFunc({ setFormikField: setFieldValue });
    setQuery({ searchString: e.target.value });
  }, 500);

  const handleDelete = () => {
    if (selected.length) {
      Modal.fire().then(({ isConfirmed }) => {
        if (isConfirmed) {
          mutate(selected);
        }
      });
    }
  };
  return (
    <>
      <Helmet>
        <title> Jobs</title>
      </Helmet>
      {isListLoading || isLoading ? (
        <Loading />
      ) : (
        <Jobs
          data={rows}
          selected={selected}
          setSelected={setSelected}
          onHandleDelete={handleDelete}
          count={rows?.length || 0}
          sortColumn="title"
          disableSelectionOnClick
          page={page}
          setPage={setPage}
          onClearFilter={onClear}
          query={query}
          initialFilterValues={initialFilterValues}
          onHandleFilterSearch={handleFilterSearch}
          onHandleSearch={handleSearch}
          filterToggle={filterToggle}
          onHandleSwitchChange={handleSwitchChange}
          loading={isLoading}
        />
      )}
    </>
  );
}

export default memo(JobsContainer);
