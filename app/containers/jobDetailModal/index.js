import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import moment from 'moment';
import { Loading } from '../../components/loading';
import { getJobById } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Toast } from '../../utils/helper';
import { JobDetailModal } from '../../components/jobDetailsModal';

function JobDetailModalContainer() {
  const { id } = useParams();
  const { data, isLoading: isJobLoading } = useQuery(
    keys.getJob(id),
    getJobById,
    {
      enabled: !!id,
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
  const jobDetailData = data?.data?.data;
  const expiryDate = moment(jobDetailData?.expiryDate).format('MM-DD-YYYY');
  return (
    <>
      <Helmet>
        <title> Job Detail Modal</title>
      </Helmet>
      {isJobLoading ? (
        <Loading />
      ) : (
        <JobDetailModal
          id={id}
          department={jobDetailData.department.name}
          location={jobDetailData.location.name}
          description={jobDetailData.description}
          expiryDate={expiryDate}
          modal
        />
      )}
    </>
  );
}

export default memo(JobDetailModalContainer);
