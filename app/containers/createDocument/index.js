import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import {
  useMutation,
  useQuery,
  useQueryClient,
  getDepartments,
} from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import AddDocumentPage from '../../components/pages/createDocument';
import {
  createDocument,
  getDepartmentById,
  updateDepartment,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { navigateTo, Toast } from '../../utils/helper';

function AddDocument() {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data: deparments, isDepartmentLoading } = useQuery(
    keys.department,
    getDepartments
  );
  // const { data, isLoading } = useQuery(
  //   keys.getDepartments(id),
  //   getDepartmentById,
  //   {
  //     enabled: !!id,
  //     refetchOnWindowFocus: false,
  //     onError: ({
  //       response: {
  //         data: { message },
  //       },
  //     }) => {
  //       Toast({
  //         icon: 'error',
  //         title: message || 'Some error occurred',
  //       });
  //     },
  //   }
  // );
  // const { mutate, isLoading: loading } = useMutation(createDocument, {
  //   onSuccess: () => {
  //     Toast({
  //       icon: 'success',
  //       title: `Document Created Successfully`,
  //     });
  //     queryClient.invalidateQueries(keys.departments);
  //     // queryClient.invalidateQueries(keys.getDepartments);
  //     // navigateTo(history, '/departments');
  //   },
  //   onError: ({
  //     response: {
  //       data: { message },
  //     },
  //   }) =>
  //     Toast({
  //       icon: 'error',
  //       title: message || 'Some error occurred',
  //     }),
  // });
  const departmentOptions = deparments?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));
  const handleSubmit = (values) => {
    debugger;
    mutate(values);
  };

  const initialValues = {
    name: '',
    description: '',
    file: '',
    departmentId: '',
    sortOrder: '',
  };
  const isLoading = () => {
    if (isDepartmentLoading) {
      return true;
    }
    return false;
  };

  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Document</title>
      </Helmet>
      {isLoading() ? (
        <Loading />
      ) : (
        <AddDocumentPage
          onHandleSubmit={handleSubmit}
          id={id}
          initialValues={initialValues}
          departmentOptions={departmentOptions}
        />
      )}
    </>
  );
}

export default memo(AddDocument);
