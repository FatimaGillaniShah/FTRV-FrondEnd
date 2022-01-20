import React, { memo, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery } from 'react-query';
import { useHistory } from 'react-router-dom';
import { Loading } from '../../components/loading';
import { Modal, Toast, navigateTo } from '../../utils/helper';
import Home from '../../components/pages/home';
import { useAuthContext } from '../../context/authContext';
import { useDeletePoll } from '../../hooks/poll';
import { usePermission } from '../../hooks/permission';
import {
  getBannerImage,
  getPolls,
  updateBannerImage,
  vote,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { features, PERMISSIONS } from '../../utils/constants';
import { parseDate } from '../../utils/functions';

function HomeContainer() {
  const { POLLS, BANNER_IMAGE, EVENTS, VOTE } = features;
  const { user } = useAuthContext();
  const history = useHistory();
  const isPollsWriteAllowed = usePermission(`${POLLS}-${PERMISSIONS.WRITE}`);
  const isVoteReadAllowed = usePermission(`${VOTE}-${PERMISSIONS.READ}`);
  const isVoteWriteAllowed = usePermission(`${VOTE}-${PERMISSIONS.WRITE}`);
  const isBannerWriteAllowed = usePermission(
    `${BANNER_IMAGE}-${PERMISSIONS.WRITE}`
  );
  const date = parseDate(new Date());
  const feature = {
    [POLLS]: false,
    [BANNER_IMAGE]: false,
    [EVENTS]: false,
  };
  const permit = usePermission;
  Object.keys(feature).forEach((RESOURCE) => {
    feature[RESOURCE] = permit(`${RESOURCE}-${PERMISSIONS.READ}`);
  });

  const {
    data: pollResponse,
    isLoading: isPollLoading,
    refetch: refetchPolls,
  } = useQuery(
    keys.polls({
      date,
      query: { searchString: '' },
      filters: { status: 'active' },
      currentPage: 1,
    }),
    getPolls,
    {
      keepPreviousData: true,
      enabled: feature.POLLS,
    }
  );

  const pollList = pollResponse?.data?.data?.rows
    .map((value) => {
      const totalVotes = value?.options.reduce(
        (accumulator, currentValue) => accumulator + currentValue.votes,
        0
      );
      const pollsOptions = value?.options.map(({ id, name, votes, voted }) => ({
        label: name,
        value: id,
        votes,
        totalVotes,
        voted,
      }));
      return {
        ...value,
        votesSum: totalVotes,
        options: pollsOptions,
      };
    })
    .filter((poll) => !poll.expired && !poll.pending);
  const {
    data: image,
    isLoading: isImageLoading,
    refetch: refetchBannerImage,
  } = useQuery(keys.bannerImage, getBannerImage, {
    enabled: feature.BANNER_IMAGE,
  });

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
  const { isLoading: isVoteLoading, mutate: mutateVote } = useMutation(vote, {
    onSuccess: onVoteSuccess,
    onError: onVoteError,
  });

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
  const mutation = useDeletePoll();

  const handleDelete = (id) => {
    Modal.fire().then(({ isConfirmed }) => {
      if (isConfirmed) {
        mutation.mutate([id]);
      }
    });
  };
  const initialValues = { pollOption: '' };
  return (
    <>
      <Helmet>
        <title>Home</title>
        <meta name="description" content="Description of Home" />
      </Helmet>
      {isPollLoading ? (
        <Loading />
      ) : (
        <Home
          isImageLoading={isUpdateImageLoading || isImageLoading}
          fileName={image?.data?.data?.fileName}
          onHandleImageChange={handleImageChange}
          pollList={pollList}
          onHandleVoteSubmit={handleVoteSubmit}
          isVoteLoading={isVoteLoading}
          onHandleDelete={handleDelete}
          isVoteReadAllowed={isVoteReadAllowed}
          isVoteWriteAllowed={isVoteWriteAllowed}
          initialValues={initialValues}
          feature={feature}
          isPollsWriteAllowed={isPollsWriteAllowed}
          isBannerWriteAllowed={isBannerWriteAllowed}
        />
      )}
    </>
  );
}

export default memo(HomeContainer);
