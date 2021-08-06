import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import { useParams } from 'react-router';
import { Toast } from '../../utils/helper';
import { Loading } from '../../components/loading';
import { getApplicants } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import Applicant from '../../components/pages/applicant';

function ApplicantContainer() {
  const [page, setPage] = useState(0);
  const { id } = useParams();
  const { data, isLoading: isListLoading } = useQuery(
    keys.applicant(id),
    getApplicants,
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

  const rows = data?.data?.data?.rows.map((applicant) => {
    const { user } = applicant;
    return {
      ...applicant,
      location: user?.location?.name,
      department: user?.department?.name,
      emailId: user?.email,
      name: user?.fullName,
      designation: user?.title,
    };
  });
  return (
    <>
      <Helmet>
        <title> Applicant</title>
      </Helmet>
      {isListLoading ? (
        <Loading />
      ) : (
        <Applicant
          data={rows}
          count={rows?.length || 0}
          sortColumn="name"
          page={page}
          setPage={setPage}
        />
      )}
    </>
  );
}

export default memo(ApplicantContainer);
