import { Box, Button } from '@material-ui/core';
import React from 'react';
import { useQuery } from 'react-query';
import UpdateIcon from '@material-ui/icons/Update';
import Show from '../show';
import Notification from '../notification';
import { useAuthContext } from '../../context/authContext';
import { getUserById } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { BodyText } from '../typography';

export const PermissionNotification = () => {
  const {
    user,
    user: {
      data: { id },
    },

    setUser,
  } = useAuthContext();
  const { permissionUpdated } = user;
  const { refetch } = useQuery(keys.getUserOwn(id), () => getUserById(id), {
    enabled: false,
    onSuccess: ({ data: { data } }) => {
      const updatedUser = {
        ...user,
        data: { ...user.data, groups: data.groups },
        permissionUpdated: false,
      };
      setUser(updatedUser);
      window.location.href = '/home';
    },
  });

  const handlePermissionUpdate = () => {
    refetch();
  };
  const notification = {
    permission: true,
    title: 'Permissions Updated!',
    description: (
      <>
        <Box mt={1} mb={1}>
          <BodyText>Your permissions has been updated!</BodyText>
        </Box>
        <UpdateIcon />
        <Button variant="text" onClick={handlePermissionUpdate}>
          <BodyText fontWeight="fontWeightMedium"> Update Now</BodyText>
        </Button>
      </>
    ),
  };
  return (
    <Show IF={permissionUpdated}>
      <Box position="absolute" bottom="25px" zIndex={100} width="20%">
        <Notification item={notification} />
      </Box>
    </Show>
  );
};

export default PermissionNotification;
