import React, { memo, useState } from 'react';
import moment from 'moment';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { Loading } from '../../components/loading';
import { getJobs } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal } from '../../utils/helper';
import { useDeleteJob } from '../../hooks/job';
import Jobs from '../../components/pages/jobs';

function JobsContainer() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const { data, isLoading: isListLoading } = useQuery(keys.jobs, getJobs);

  const rows = data?.data?.data?.rows.map((value) => ({
    ...value,
    department: value.department.name,
    location: value.location.name,
    expiryDate: moment(value.expiryDate).format('MM-DD-YYYY'),
  }));
  const { mutate, isLoading } = useDeleteJob({
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
  return (
    <>
      <Helmet>
        <title> Jobs</title>
      </Helmet>
      {isLoading || isListLoading ? (
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
        />
      )}
    </>
  );
}

export default memo(JobsContainer);
