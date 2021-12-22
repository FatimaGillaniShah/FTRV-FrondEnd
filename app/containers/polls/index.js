/**
 *
 * Poll
 *
 */

import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { debounce } from 'lodash';
import { Loading } from '../../components/loading';
import { keys } from '../../state/queryKeys';
import { Modal } from '../../utils/helper';
import { useDeletePoll } from '../../hooks/poll';
import { PollsPage } from '../../components/pages/polls/index';
import { getPolls } from '../../state/queryFunctions';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';
import { parseDate } from '../../utils/functions';

function Poll() {
  const [filterToggle, setFilterToggle] = useState(false);
  const [fieldFunc, setFieldFunc] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [page, setPage] = useState(0);
  const [filters, setFilters] = useState();
  const [query, setQuery] = useState({ searchString: '' });
  const isWriteAllowed = usePermission(
    `${features.POLLS}-${PERMISSIONS.WRITE}`
  );
  const date = parseDate(new Date());
  const { data: pollResponse, isLoading: isPollLoading } = useQuery(
    keys.polls({
      date,
      query,
      filters,
      currentPage,
    }),
    getPolls,
    {
      keepPreviousData: true,
    }
  );
  const pollList = pollResponse?.data?.data?.rows.map((value) => {
    const totalVotes = value?.options.reduce(
      (accumulator, currentValue) => accumulator + currentValue.votes,
      0
    );
    const pollsOptions = value?.options.map(({ name, id, votes }) => ({
      label: name,
      value: id,
      votes,
      totalVotes,
    }));
    return {
      ...value,
      votesSum: totalVotes,
      options: pollsOptions,
    };
  });
  const handleChange = (event, pageNumber) => {
    setCurrentPage(pageNumber);
  };
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

  const mutation = useDeletePoll();

  const handleDelete = (id) => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutation.mutate([id]);
        if (pollList.length === 1) {
          setCurrentPage(1);
        }
      }
    });
  };
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
      {isPollLoading || mutation.isLoading ? (
        <Loading />
      ) : (
        <PollsPage
          data={pollList}
          page={page}
          count={pollResponse?.data?.data?.count}
          query={query}
          filters={filters}
          filterToggle={filterToggle}
          onHandleFilterSearch={handleFilterSearch}
          onHandleSwitchChange={handleSwitchChange}
          onHandleSearch={handleSearch}
          onClearFilter={onClear}
          currentPage={currentPage}
          onHandleChange={handleChange}
          initialFilterValues={initialFilterValues}
          onHandleDelete={handleDelete}
          isWriteAllowed={isWriteAllowed}
        />
      )}
    </>
  );
}

export default memo(Poll);
