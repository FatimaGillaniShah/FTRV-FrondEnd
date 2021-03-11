import { Box, Button, Card } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React from 'react';
import Image from 'material-ui-image';
import Calendar from './calendar';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
  },

  bannerGridSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.3',
    marginBlock: '0.2rem',
  },
  statsSection: {
    backgroundColor: theme.palette.bgColor.secondary,
    flex: '0.7',
    marginBlock: '0.2rem',
  },
}));
function Home() {
  const classes = useStyles();

  return (
    <>
      <Box
        display="flex"
        // p={1}
        width={1}
        flexDirection={['column-reverse', 'row']}
      >
        <Box
          // bgcolor="background.paper"
          // style={{ backgroundColor: 'red' }}
          width={[1, 0.7]}
          flex={1}
          flexDirection="column"
          // height={[0.65, 1]}
          // m={1}
          p={1}
        >
          <Box
            bgcolor="background.paper"
            m={1}
            flex="30%"
            mb={2}
            alignItems="center"
          >
            <img
              // aspectRatio={16 / 9}
              style={{ width: '100%', height: '100%' }}
              // cover
              src="https://assets-cdn-interactrv.netdna-ssl.com/funtownrv/images/assets%20frequently%20used/interactive%20mark%20iii.png"
            />
          </Box>
          <Box
            bgcolor="background.paper"
            m={1}
            flex="70%"
            // height="100%"
            flexDirection={['column', 'column', 'row']}
            justifyContent="center"
            display="flex"
          >
            <Box width={1 / 2}>
              <Calendar />
            </Box>
            <Box width={1 / 2}>
              <Calendar />
            </Box>
          </Box>
        </Box>
        <Box
          height={[0.3, 1]}
          // bgcolor="background.paper"
          width={[1, 0.29]}
          // m={1}
          p={1}
          ml={[1, 2]}
        ></Box>
      </Box>
    </>
  );
}

export default Home;
