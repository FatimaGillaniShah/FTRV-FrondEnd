import { Box } from '@material-ui/core';
import React from 'react';
import { Poll } from '../../poll';
import Show from '../../show';

function PollHome({ pollData }) {
  return (
    <>
      <Show IF={pollData}>
        <Box p={2} mr={[0, 0, 0, 8]} ml={[0, 0, 0, 8]} width={[1, 1, 1, 1 / 2]}>
          <Poll
            name={pollData.name}
            description={pollData.description}
            options={pollData.options}
          />
        </Box>
      </Show>
    </>
  );
}

export default PollHome;
