import React, { memo, useEffect, useRef, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useHistory } from 'react-router-dom';
import Home from '../../components/pages/home/loadable';
import { useAuthContext } from '../../context/authContext';
import {
  fetchEvents,
  getBannerImage,
  updateBannerImage,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import bannerImage from '../../images/group.png';
import { Toast } from '../../utils/helper';

function HomeContainer() {
  const { user } = useAuthContext();
  const history = useHistory();
  const [imgFile, setImgFile] = useState(bannerImage);
  const queryClient = useQueryClient();
  const formikRef = useRef();
  const dailyQuote =
    '"lorem ipsum dolor sit amet consectetur adipisicing elitNemo lorem ipsum dolor sit amet consectetur adipisicing elit Nemo"';

  const { data, isEventsLoading } = useQuery(keys.events, fetchEvents);
  const { data: image, isLoading: isImageLoading } = useQuery(
    keys.getBannerImage,
    getBannerImage
  );
  const { mutate, isLoading: isUpdateImageLoading } = useMutation(
    updateBannerImage,
    {
      onSuccess: () => {
        Toast({
          icon: 'success',
          title: `Image Updated Successfully`,
        });
        queryClient.invalidateQueries(keys.getBannerImage);
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
  const defaultData = { file: image?.data?.data?.data?.fileName };

  useEffect(() => {
    if (!user || !user.isAuthenticated) {
      history.push('/');
    }
  }, []);

  useEffect(() => {
    if (defaultData?.file)
      setImgFile(process.env.API_ASSETS_URL + defaultData.file);
  }, [defaultData?.file]);

  useEffect(() => {
    if (formikRef?.current?.values?.file) {
      const formData = new FormData();
      formData.append('file', formikRef.current?.values?.file?.file);
      mutate(formData);
    }
  }, [formikRef.current?.values?.file]);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      <Home
        initialData={defaultData}
        isImageLoading={isImageLoading || isUpdateImageLoading}
        dailyQuote={dailyQuote}
        isEventsLoading={isEventsLoading}
        eventList={data?.data?.data?.rows}
        setImgFile={setImgFile}
        imgFile={imgFile}
        formikRef={formikRef}
      />
    </>
  );
}

export default memo(HomeContainer);
