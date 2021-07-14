import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { CreateDocumentPage } from '../../components/pages/createDocument';
import {
  createDocument,
  getDocumentById,
  updateDocument,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { createFormData } from '../../utils/functions';
import { navigateTo, Toast } from '../../utils/helper';

function AddDocument() {
  const { id } = useParams();
  const history = useHistory();
  const queryClient = useQueryClient();

  const { data, isLoading: isDocumentLoading } = useQuery(
    keys.getDocument(id),
    getDocumentById,
    {
      enabled: !!id,
    }
  );
  let document = data?.data?.data;
  document = {
    ...document,
    description: document?.description || '',
    file: document?.url,
  };
  const onDocumentSuccess = () => {
    queryClient.invalidateQueries(keys.documentDepartment);
    Toast({
      icon: 'success',
      title: `Document ${id ? 'Updated' : 'Created'}  successfully`,
    });

    navigateTo(history, '/documents');
    if (id) queryClient.invalidateQueries(keys.getDocument(id));
  };

  const onDocumentError = ({
    response: {
      data: { message },
    },
  }) => {
    Toast({
      icon: 'error',
      title: message || 'Some error occurred',
    });
  };
  const { mutate, isLoading } = useMutation(
    id ? updateDocument : createDocument,
    {
      onSuccess: onDocumentSuccess,
      onError: onDocumentError,
    }
  );

  const handleSubmit = (values) => {
    const formData = createFormData(values);
    mutate(formData);
  };

  const initialValues = {
    departmentId: '',
    file: '',
    name: '',
    description: '',
  };
  return (
    <>
      <Helmet>
        <title>{id ? 'Edit' : 'Create'} Document</title>
      </Helmet>
      {isLoading || isDocumentLoading ? (
        <Loading />
      ) : (
        <CreateDocumentPage
          id={id}
          initialValues={id ? document : initialValues}
          onHandleSubmit={handleSubmit}
        />
      )}
    </>
  );
}

export default memo(AddDocument);
