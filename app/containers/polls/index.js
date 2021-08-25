/**
 *
 * Poll
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { debounce } from 'lodash';
import { PollsPage } from '../../components/pages/polls/index';

function Poll() {
  const [filterToggle, setFilterToggle] = useState(false);
  const [fieldFunc, setFieldFunc] = useState();
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState();
  const [query, setQuery] = useState({ searchString: '' });
  useEffect(() => {
    if (filterToggle) {
      fieldFunc?.setFormikField('searchString', '');
      setQuery({ searchString: '' });
    }
  }, [filterToggle]);

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

  const initialFilterValues = {
    name: '',
    status: '',
  };

  return (
    <>
      <Helmet>
        <title>Poll</title>
        <meta name="description" content="Description of Poll" />
      </Helmet>

      <PollsPage
        page={page}
        query={query}
        filters={filters}
        filterToggle={filterToggle}
        onHandleFilterSearch={handleFilterSearch}
        onHandleSwitchChange={handleSwitchChange}
        onHandleSearch={handleSearch}
        onClearFilter={onClear}
        initialFilterValues={initialFilterValues}
      />
    </>
  );
}

export default memo(Poll);
