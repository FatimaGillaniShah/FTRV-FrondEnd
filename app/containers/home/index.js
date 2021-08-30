import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/loading';
import Home from '../../components/pages/home';
import { useAuthContext } from '../../context/authContext';
import {
  fetchEvents,
  getBannerImage,
  getPolls,
  updateBannerImage,
  votePoll,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { parseDate } from '../../utils/functions';
import { Toast, navigateTo } from '../../utils/helper';

function HomeContainer() {
  const { user } = useAuthContext();
  const history = useHistory();
  const { data, isEventsLoading } = useQuery(keys.events, fetchEvents);
  const date = parseDate(new Date());
  const {
    data: pollResponse,
    isLoading: isPollLoading,
    refetch: refetchPolls,
  } = useQuery(keys.polls({ filters: { status: 'active' }, date }), getPolls);
  const pollList = pollResponse?.data?.data?.rows
    .map((value) => {
      const totalVotes = 0;
      const pollsOptions = value?.options.map(({ id, name, votes, voted }) => ({
        label: name,
        value: id,
        votes,
        totalVotes: totalVotes + votes,
        voted,
      }));
      return {
        ...value,
        options: pollsOptions,
      };
    })
    .filter((poll) => !poll.expired && !poll.pending);
  const {
    data: image,
    isLoading: isImageLoading,
    refetch: refetchBannerImage,
  } = useQuery(keys.bannerImage, getBannerImage);

  const onVoteSuccess = () => {
    refetchPolls();
    Toast({
      icon: 'success',
      title: `Voted Successfully`,
    });
  };
  const onVoteError = ({
    response: {
      data: { message },
    },
  }) => {
    Toast({
      icon: 'error',
      title: message || 'Some error occurred',
    });
  };
  const { isLoading: isVoteLoading, mutate: mutateVote } = useMutation(
    votePoll,
    {
      onSuccess: onVoteSuccess,
      onError: onVoteError,
    }
  );

  const onUpdateImageSuccess = () => {
    Toast({
      icon: 'success',
      title: `Image Updated Successfully`,
    });
    refetchBannerImage();
  };
  const onUpdateImageError = ({
    response: {
      data: { message },
    },
  }) => {
    Toast({
      icon: 'error',
      title: message || 'Some error occurred',
    });
  };

  const { mutate, isLoading: isUpdateImageLoading } = useMutation(
    updateBannerImage,
    {
      onSuccess: onUpdateImageSuccess,
      onError: onUpdateImageError,
    }
  );

  useEffect(() => {
    if (!user || !user.isAuthenticated) {
      navigateTo(history, '/');
    }
  }, []);

  const handleImageChange = (fileObj) => {
    if (fileObj?.file) {
      const formData = new FormData();
      formData.append('file', fileObj?.file);
      mutate(formData);
    }
  };

  const handleVoteSubmit = (pollId, values) => {
    const body = {
      pollOptionId: Number(values.pollOption),
      pollId,
      date,
    };
    mutateVote(body);
  };

  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      {isEventsLoading || isPollLoading ? (
        <Loading />
      ) : (
        <Home
          isImageLoading={isUpdateImageLoading || isImageLoading}
          eventList={data?.data?.data?.rows}
          fileName={image?.data?.data?.fileName}
          onHandleImageChange={handleImageChange}
          pollList={pollList}
          onHandleVoteSubmit={handleVoteSubmit}
          isVoteLoading={isVoteLoading}
        />
      )}
    </>
  );
}

export default memo(HomeContainer);
