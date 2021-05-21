import React, { memo } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory, useParams } from 'react-router';
import { AddUsefulLinkPage } from '../../components/pages/addUsefulLink';
import {
  createLink,
  getLinkById,
  updateLink,
  getCategories,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Toast } from '../../utils/helper';
import { Loading } from '../../components/loading';

function AddUsefulLink() {
  const history = useHistory();
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    keys.getLink(id),
    () => getLinkById(id),
    {
      enabled: !!id,
    }
  );
  const { data: categories, isCategoryLoading } = useQuery(
    keys.getCategories,
    getCategories
  );

  const mutation = useMutation(id ? updateLink : createLink, {
    onSuccess: () => {
      history.push('/link-categories/useful-links');
      Toast({
        icon: 'success',
        title: `Link ${id ? 'updated' : 'created'}  successfully`,
      });
      queryClient.invalidateQueries(keys.links);
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
    mutation.mutate(values);
  };

  const options = categories?.data.data.map((val) => ({
    value: val.id,
    label: val.name,
  }));

  return (
    <>
      <Helmet>
        <title>Useful Links</title>
      </Helmet>
      {isLoading && isCategoryLoading && <Loading />}
      <AddUsefulLinkPage
        id={id}
        onHandleSubmit={handleSubmit}
        initialValues={data?.data.data}
        history={history}
        options={options}
      />
    </>
  );
}

export default memo(AddUsefulLink);
