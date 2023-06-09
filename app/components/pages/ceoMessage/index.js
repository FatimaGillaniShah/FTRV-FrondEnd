import React from 'react';
import Box from '@material-ui/core/Box';
import EditIcon from '@material-ui/icons/Edit';
import { useHistory } from 'react-router-dom';
import { Avatar, IconButton } from '@material-ui/core';
import ReactHtmlParser from 'html-react-parser';
import { H5, BodyTextLarge } from '../../typography';
import { useStyles } from './styles';
import { navigateTo } from '../../../utils/helper';
import Show from '../../show';

export default function CeoMessage({ ceoMessageData, isWriteAllowed }) {
  const classes = useStyles();
  const history = useHistory();

  return (
    <>
      <Box width={[1, 1, 1, '30%']} display="flex" className={classes.rightBox}>
        <Box
          className={classes.backgroundImage}
          height={1}
          width={1}
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          <Avatar
            className={classes.ceoImage}
            src={ceoMessageData.avatar}
            alt="person"
          ></Avatar>
        </Box>
      </Box>
      <Box width={[1, 1, 1, '68%']} p={2} m={2} mt={5} display="flex" mb={4}>
        <Box width={1 / 2}>
          <H5>CEO Message</H5>
        </Box>
        <Show IF={isWriteAllowed}>
          <Box width={1 / 2} display="flex" justifyContent="flex-end">
            <IconButton
              onClick={() => navigateTo(history, '/ceo-message/edit')}
            >
              <EditIcon className={classes.editIcon} />
            </IconButton>
          </Box>
        </Show>
      </Box>
      <Box px={2} m={2}>
        <BodyTextLarge fontWeight="fontWeightLight" color="grey">
          <Box className={classes.root}>
            {ReactHtmlParser(ceoMessageData.content)}
          </Box>
        </BodyTextLarge>
      </Box>
    </>
  );
}
