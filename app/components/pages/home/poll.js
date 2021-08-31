import { Box } from '@material-ui/core';
import React from 'react';
import { Poll } from '../../poll';

function PollHome({ poll, onHandleVoteSubmit, isVoteLoading, onHandleDelete }) {
  const votedOption = poll.options.filter((option) => !!option.voted);

  const initialValues = {
    pollOption: votedOption.length > 0 ? votedOption[0].value.toString() : '',
  };
  return (
    <Box p={2} mr={[0, 0, 0, 8]} ml={[0, 0, 0, 0]} width={[1, 1, 1, 1]}>
      <Poll
        name={poll.name}
        description={poll.question}
        options={poll.options}
        initialValues={initialValues}
        id={poll.id}
        onHandleVoteSubmit={onHandleVoteSubmit}
        isVoteLoading={isVoteLoading}
        voted={votedOption.length > 0}
        onHandleDelete={onHandleDelete}
        home
      />
    </Box>
  );
}

export default PollHome;
