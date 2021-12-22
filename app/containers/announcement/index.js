import React, { memo, useState, useEffect } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import { useQuery } from 'react-query';
import { Alert } from '@material-ui/lab';
import moment from 'moment';
import { getHeadCells } from './columns';
import WrapInCard from '../../components/layout/wrapInCard';
import DataTable from '../../components/dataTable';
import TableButtons from './tableButtons';
import { Loading } from '../../components/loading';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { retrieveAnnouncements } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal, capitalize } from '../../utils/helper';
import { useDeleteAnnouncement } from '../../hooks/announcement';
import Show from '../../components/show';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';

function AnnouncementContainer() {
  const [selected, setSelected] = useState([]);
  const [formatData, setFormatData] = useState([]);
  const [page, setPage] = useState(0);
  const isWriteAllowed = usePermission(
    `${features.ANNOUNCEMENT}-${PERMISSIONS.WRITE}`
  );
  const { data, isLoading } = useQuery(
    keys.adminAnnouncements,
    retrieveAnnouncements
  );
  const mutation = useDeleteAnnouncement({ callbackFn: () => setSelected([]) });

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

  useEffect(() => {
    let updatedFormatData = [];
    if (data) {
      updatedFormatData = data?.data?.data?.rows?.map((item) => {
        const announcement = { ...item };

        announcement.startTime = moment(announcement.startTime).format(
          'MM-DD-YYYY'
        );
        announcement.endTime = moment(announcement.endTime).format(
          'MM-DD-YYYY'
        );
        announcement.status = capitalize(announcement.status);
        announcement.priority = capitalize(announcement.priority);

        return announcement;
      });
    }
    setFormatData(updatedFormatData);
  }, [data]);

  return (
    <>
      <Helmet>
        <title>Announcement</title>
      </Helmet>
      {isLoading ? (
        <Loading />
      ) : (
        <WrapInBreadcrumbs>
          <Box width={1}>
            <WrapInCard>
              <Show IF={isWriteAllowed}>
                <Box mt={4}>
                  <TableButtons
                    loading={mutation.isLoading}
                    onDelete={handleDelete}
                    numSelected={selected.length}
                  />
                  <Show IF={selected.length > 0}>
                    <Box my={4}>
                      <Alert severity="info">
                        <strong>{selected.length}</strong> Announcement(s)
                        Selected
                      </Alert>
                    </Box>
                  </Show>
                </Box>
              </Show>
              <DataTable
                rows={formatData}
                columns={getHeadCells({ isWriteAllowed })}
                setSelected={setSelected}
                selected={selected}
                count={formatData?.length || 0}
                sortColumn="title"
                isWriteAllowed={isWriteAllowed}
                page={page}
                setPage={setPage}
              />
            </WrapInCard>
          </Box>
        </WrapInBreadcrumbs>
      )}
    </>
  );
}

export default memo(AnnouncementContainer);
