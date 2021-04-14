import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import AddCeoMessageInfo from '../../components/pages/updateCeoMessage';
import { getCeoMessage, saveCeoMessage } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Loading } from '../../components/loading';
import { Toast } from '../../utils/helper';

function AddCeoMessage() {
  const history = useHistory();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(keys.ceoMessage, getCeoMessage);
  const mutation = useMutation(saveCeoMessage, {
    onSuccess: () => {
      history.push('/ceo-message');
      Toast({
        icon: 'success',
        title: 'Message updated successfully',
      });
      queryClient.invalidateQueries(keys.ceoMessage);
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message || 'Some error occured',
      });
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
