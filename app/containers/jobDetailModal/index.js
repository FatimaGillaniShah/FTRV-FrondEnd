import React, { memo } from 'react';
import { useQuery } from 'react-query';
import moment from 'moment';
import JobDetailModal from '../../components/jobDetailsModal';
import { getJobById } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Toast } from '../../utils/helper';

function JobDetailModalContainer({ id, modal, onHandleClose }) {
  const { data, isLoading: isListLoading } = useQuery(
    keys.getJobById(id),
    getJobById,
    {
      enabled: modal && !!id,
      onError: ({
        response: {
          data: { message },
        },
      }) => {
        Toast({
          icon: 'error',
          title: message || 'Some error occurred',
        });
      },
    }
  );
  const jobDetail = data?.data?.data && data?.data?.data[0];
  const expiryDate = moment(jobDetail?.expiryDate).format('MM-DD-YYYY');

  return (
    <>
      {!isListLoading && (
        <JobDetailModal
          id={id}
          jobDetail={jobDetail}
          expiryDate={expiryDate}
          onHandleClose={onHandleClose}
          modal={modal}
        />
      )}
    </>
  );
}

export default memo(JobDetailModalContainer);
