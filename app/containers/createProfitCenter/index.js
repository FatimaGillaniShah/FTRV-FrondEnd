import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { debounce } from 'lodash';
import { Loading } from '../../components/loading';
import { createProfitCenter, fetchUsers } from '../../state/queryFunctions';
import { navigateTo, Toast } from '../../utils/helper';
import { keys } from '../../state/queryKeys';
import CreateProfitCenterPage from '../../components/pages/createProfitCenter';

function CreateProfitCenter() {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [filters, setFilter] = useState({ name: '' });
  const { data, isUsersLoading } = useQuery(
    keys.getUsers({
      sortColumn: 'email',
      pageNumber: 1,
      pageSize: 1000,
      sortOrder: 'asc',
      filters,
    }),
    fetchUsers
  );
  const options = data?.data?.data?.rows;
  const { mutate, isLoading } = useMutation(createProfitCenter, {
    onSuccess: () => {
      Toast({
        icon: 'success',
        title: 'Profit Center Created successfully',
      });
      queryClient.invalidateQueries(keys.profitCenters({}));
      navigateTo(history, '/profit-center');
    },
    onError: ({
      response: {
        data: { message },
      },
    }) =>
      Toast({
        icon: 'error',
        title: message || 'Some error occurred',
      }),
  });

  const handleSearch = debounce((e) => {
    setFilter({ name: e.target.value });
  }, 500);

  const handleSubmit = (values) => {
    const profitCenter = {
      ...values,
      managerId: values.managerId.id,
    };
    mutate(profitCenter);
  };
  const initialValues = {
    name: '',
    managerId: '',
    code: '',
    address: '',
    faxNumber: '',
    contactNo: '',
    centerNumber: '',
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Profit Center</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <CreateProfitCenterPage
          id={id}
          onHandleSubmit={handleSubmit}
          options={options}
          initialValues={initialValues}
          loading={isLoading}
          usersLoading={isUsersLoading}
          onHandleSearch={handleSearch}
        />
      )}
    </>
  );
}

export default memo(CreateProfitCenter);
