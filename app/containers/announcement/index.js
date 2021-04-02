import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import Swal from 'sweetalert2';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import { headCells } from './columns';
import WrapInCard from '../../components/layout/wrapInCard';
import DataTable from '../../components/dataTable';
import TableButtons from './tableButtons';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import {
  retrieveAnnouncements,
  deleteAnnouncement,
} from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal, Toast } from '../../utils/helper';

function AnnouncementContainer() {
  const [selected, setSelected] = useState([]);
  const queryClient = useQueryClient();
  const { data, isLoading } = useQuery(
    keys.adminAnnouncements,
    retrieveAnnouncements,
    { refetchOnWindowFocus: false }
  );
  const mutation = useMutation(deleteAnnouncement, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      setSelected([]);
      Swal.fire('Deleted!', `${count} announcement deleted.`, 'success');
      queryClient.invalidateQueries(keys.announcements);
    },
    onError: ({
      response: {
        data: { message },
      },
    }) => {
      Toast({
        icon: 'error',
        title: message || 'Some error occured',
      });
    },
  });

  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  const handleDelete = () => {
    if (!selected.length) {
      return;
    }
    Modal.fire().then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(selected);
      }
    });
  };

  return (
    <>
      <Helmet>
        <title>Announcement</title>
      </Helmet>
      <WrapInBreadcrumbs>
        <Box width={1}>
          <WrapInCard>
            {role === ROLES.ADMIN && (
              <Box mt={4}>
                <TableButtons
                  onDelete={handleDelete}
                  numSelected={selected.length}
                />
              </Box>
            )}
            {!isLoading && (
              <DataTable
                data={data && data.data.data.rows}
                headCells={headCells}
                setSelected={setSelected}
                selected={selected}
                matchUserIdWithIDS
              />
            )}
          </WrapInCard>
        </Box>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(AnnouncementContainer);
