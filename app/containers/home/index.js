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
import { Loading } from '../../components/loading';

function HomeContainer() {
  const { user } = useAuthContext();
  const history = useHistory();
  const [imgFile, setImgFile] = useState(bannerImage);
  const queryClient = useQueryClient();
  const formikRef = useRef();
  const imageUrl = formikRef?.current?.values?.file?.file;

  const { data, isEventsLoading } = useQuery(keys.events, fetchEvents);
  const { data: image, isLoading: isImageLoading } = useQuery(
    keys.bannerImage,
    getBannerImage
  );
  const defaultData = { file: image?.data?.data?.data?.fileName };
  const initialBannerImage = defaultData?.file
    ? process.env.API_ASSETS_URL + defaultData?.file
    : bannerImage;
  const { mutate, isLoading: isUpdateImageLoading } = useMutation(
    updateBannerImage,
    {
      onSuccess: () => {
        Toast({
          icon: 'success',
          title: `Image Updated Successfully`,
        });
        queryClient.invalidateQueries(keys.bannerImage);
      },
      onError: ({
        response: {
          data: { message },
        },
      }) => {
        setImgFile(initialBannerImage);
        Toast({
          icon: 'error',
          title: message || 'Some error occurred',
        });
      },
    }
  );

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
    if (imageUrl) {
      const formData = new FormData();
      formData.append('file', imageUrl);
      mutate(formData);
    }
  }, [imageUrl]);

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      {isImageLoading || isEventsLoading || isUpdateImageLoading ? (
        <Loading />
      ) : (
        <Home
          initialData={defaultData}
          eventList={data?.data?.data?.rows}
          setImgFile={setImgFile}
          imgFile={imgFile}
          formikRef={formikRef}
        />
      )}
    </>
  );
}

export default memo(HomeContainer);
