import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQueryClient, useQuery } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { debounce, omit } from 'lodash';
import { Loading } from '../../components/loading';
import {
  createProfitCenter,
  fetchUsers,
  getProfitCenterById,
  updateProfitCenter,
} from '../../state/queryFunctions';
import { navigateTo, Toast } from '../../utils/helper';
import { keys } from '../../state/queryKeys';
import CreateProfitCenterPage from '../../components/pages/createProfitCenter';

function CreateProfitCenter() {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [filters, setFilter] = useState({ name: '' });
  const { data: profitCenterData, isLoading: isProfitCenterLoading } = useQuery(
    keys.getProfitCenter(id),
    getProfitCenterById,
    {
      enabled: !!id,
    }
  );
  const profitCenterById = profitCenterData?.data?.data;

  const { data, isUsersLoading } = useQuery(
    keys.getUsers({
      detail: false,
      sortColumn: 'email',
      pageNumber: 1,
      pageSize: 10,
      sortOrder: 'asc',
      filters,
    }),
    fetchUsers
  );
  const options = data?.data?.data?.rows;
  const { mutate, isLoading } = useMutation(
    id ? updateProfitCenter : createProfitCenter,
    {
      onSuccess: () => {
        Toast({
          icon: 'success',
          title: `Profit Center  ${id ? 'Updated' : 'Created'}  successfully`,
        });
        queryClient.invalidateQueries(keys.profitCenters({}));
        if (id) queryClient.invalidateQueries(keys.getProfitCenter(id));
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
    }
  );

  const handleSearch = debounce((e) => {
    if (typeof e.target.value !== 'number') {
      setFilter({ name: e.target.value });
    }
  }, 500);

  const handleSubmit = (values) => {
    const profitCenter = omit(values, ['createdByUser', 'updatedByUser']);
    if (
      typeof profitCenter.managerId === 'object' &&
      profitCenter.managerId !== null
    ) {
      profitCenter.managerId = profitCenter.managerId.id;
    }

    delete profitCenter.manager;
    mutate(profitCenter);
  };
  const initialValues = {
    name: '',
    managerId: null,
    code: '',
    address: '',
    faxNo: '',
    contactNo: '',
    centerNo: '',
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Profit Center</title>
      </Helmet>
      {isProfitCenterLoading ? (
        <Loading />
      ) : (
        <CreateProfitCenterPage
          id={id}
          onHandleSubmit={handleSubmit}
          options={options}
          initialValues={id ? profitCenterById : initialValues}
          loading={isLoading}
          usersLoading={isUsersLoading}
          onHandleSearch={handleSearch}
          setFilter={setFilter}
        />
      )}
    </>
  );
}

export default memo(CreateProfitCenter);
