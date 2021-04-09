import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import AddCeoMessageInfo from '../../components/pages/updateCeoMessage';
import { getCeoMessage, saveCeoMessage } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Loading } from '../../components/loading';
import { Toast } from '../../components';

function AddCeoMessage() {
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(keys.ceoMessage, getCeoMessage);
  const mutation = useMutation(saveCeoMessage, {
    onSuccess: () => {
      queryClient.invalidateQueries(keys.ceoMessage);
    },
  });
  const handleSubmit = (values) => {
    const ceoData = values;
    const dataFile = new FormData();
    if (ceoData.file && ceoData.file.size) {
      dataFile.append('file', ceoData.file);
    }
    if (ceoData.content) {
      dataFile.append('content', ceoData.content);
    }
    mutation.mutate(dataFile);
  };

  return (
    <>
      <Helmet>
        <title>Update Ceo Message</title>
      </Helmet>
      {mutation.isSuccess && (
        <Toast variant="success">Message updated successfully</Toast>
      )}
      {mutation.isError && (
        <Toast variant="error">Some error occurred. Please try again</Toast>
      )}
      {isLoading ? (
        <Loading />
      ) : (
        <AddCeoMessageInfo
          mutation={mutation}
          onHandleSubmit={handleSubmit}
          value={data?.data?.data}
        />
      )}
    </>
  );
}

export default memo(AddCeoMessage);
