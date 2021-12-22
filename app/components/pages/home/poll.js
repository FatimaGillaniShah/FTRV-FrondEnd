import { Box } from '@material-ui/core';
import React from 'react';
import { Poll } from '../../poll';

function PollHome({
  poll,
  onHandleVoteSubmit,
  isVoteLoading,
  onHandleDelete,
  initialValues,
  isWriteAllowed,
  isVoteWriteAllowed,
}) {
  return (
    <Box p={2} mr={[0, 0, 0, 8]} ml={[0, 0, 0, 0]} width={[1, 1, 1, 1]}>
      <Poll
        name={poll.name}
        description={poll.question}
        options={poll.options}
        id={poll.id}
        onHandleVoteSubmit={onHandleVoteSubmit}
        isVoteLoading={isVoteLoading}
        voted={poll.voted}
        onHandleDelete={onHandleDelete}
        home
        isVoteWriteAllowed={isVoteWriteAllowed}
        votesSum={poll.votesSum}
        initialValues={initialValues}
        isWriteAllowed={isWriteAllowed}
      />
    </Box>
  );
}

export default PollHome;
