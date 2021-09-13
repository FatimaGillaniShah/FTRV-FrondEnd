/**
 *
 * Profit Center
 *
 */

import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { debounce } from 'lodash';
import { Loading } from '../../components/loading';
import { keys } from '../../state/queryKeys';
import { getProfitCenters } from '../../state/queryFunctions';
import ProfitCenterPage from '../../components/pages/profitCenter';
import { useDeleteProfitCenter } from '../../hooks/profitCenter';
import { Modal } from '../../utils/helper';
import Show from '../../components/show';

function ProfitCenter() {
  const [page, setPage] = useState(0);
  const [query, setQuery] = useState({ searchString: '' });
  const [selected, setSelected] = useState([]);
  const {
    data: profitCenterResponse,
    isLoading: isProfitCenterLoading,
  } = useQuery(
    keys.profitCenters({
      query,
    }),
    getProfitCenters,
    {
      keepPreviousData: true,
    }
  );
  const { mutate, isLoading } = useDeleteProfitCenter({
    callbackFn: () => setSelected([]),
  });
  const profitCenterList = profitCenterResponse?.data?.data?.rows?.map(
    (profitCenter) => ({
      ...profitCenter,
      managerName: profitCenter?.manager?.fullName,
    })
  );

  const handleDelete = () => {
    if (selected.length) {
      Modal.fire().then(({ isConfirmed }) => {
        if (isConfirmed) {
          mutate(selected);
        }
      });
    }
  };

  const handleSearch = debounce(({ target }) => {
    setPage(0);
    setQuery({ searchString: target.value });
  }, 500);

  return (
    <>
      <Helmet>
        <title>ProfitCenter</title>
        <meta name="description" content="Description of Profit Center" />
      </Helmet>
      <Show IF={isProfitCenterLoading || isLoading}>
        <Loading />
      </Show>
      <Show IF={!isProfitCenterLoading && !isLoading}>
        <ProfitCenterPage
          data={profitCenterList}
          count={profitCenterResponse?.data?.data?.count}
          query={query}
          onHandleSearch={handleSearch}
          page={page}
          setPage={setPage}
          selected={selected}
          setSelected={setSelected}
          onHandleDelete={handleDelete}
        />
      </Show>
    </>
  );
}

export default memo(ProfitCenter);
