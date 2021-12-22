import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import { useQuery } from 'react-query';
import { Alert } from '@material-ui/lab';
import { getLocations } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { getHeadCells } from './columns';
import { Modal } from '../../utils/helper';
import { useDeleteLocation } from '../../hooks/location';
import DataTable from '../../components/dataTable';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import WrapInCard from '../../components/layout/wrapInCard';
import { TableButtons } from './tableButtons';
import { Loading } from '../../components/loading';
import Show from '../../components/show';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';

function Locations() {
  const isWriteAllowed = usePermission(
    `${features.LOCATION}-${PERMISSIONS.WRITE}`
  );
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const mutation = useDeleteLocation({ callbackFn: () => setSelected([]) });
  const { data, isLoading } = useQuery(keys.locations, getLocations);
  const locations = data?.data?.data?.rows;
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
        <title>Locations</title>
      </Helmet>

      {isLoading || mutation.isLoading ? (
        <Loading />
      ) : (
        <WrapInBreadcrumbs>
          <WrapInCard mb={8}>
            <Show IF={isWriteAllowed}>
              <Box mt={4}>
                <TableButtons
                  handleDelete={handleDelete}
                  numSelected={selected?.length}
                  loading={mutation.isLoading}
                />
                <Show IF={selected?.length > 0}>
                  <Box my={4}>
                    <Alert severity="info">
                      <strong>{selected?.length}</strong> Location(s) Selected
                    </Alert>
                  </Box>
                </Show>
              </Box>
            </Show>
            <DataTable
              rows={locations}
              columns={getHeadCells({ isWriteAllowed })}
              selected={selected}
              setSelected={setSelected}
              count={locations?.length || 0}
              sortColumn="name"
              isWriteAllowed={isWriteAllowed}
              page={page}
              setPage={setPage}
            />
          </WrapInCard>
        </WrapInBreadcrumbs>
      )}
    </>
  );
}

export default memo(Locations);
