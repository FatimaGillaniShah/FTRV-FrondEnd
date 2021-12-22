import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import { useQuery } from 'react-query';
import { Alert } from '@material-ui/lab';
import { getDepartments } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { getHeadCells } from './columns';
import DataTable from '../../components/dataTable';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import WrapInCard from '../../components/layout/wrapInCard';
import TableButtons from './tableButtons';
import { Loading } from '../../components/loading';
import { Modal } from '../../utils/helper';
import { useDeleteDepartment } from '../../hooks/department';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';
import Show from '../../components/show';

function Departments() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);
  const isWriteAllowed = usePermission(
    `${features.DEPARTMENT}-${PERMISSIONS.WRITE}`
  );
  const mutation = useDeleteDepartment({ callbackFn: () => setSelected([]) });
  const { data, isLoading } = useQuery(keys.departments, getDepartments);
  const departments = data?.data?.data?.rows;
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
        <title>Departments</title>
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
                  numSelected={selected.length}
                  loading={mutation.isLoading}
                />
                {selected?.length > 0 && (
                  <Box my={4}>
                    <Alert severity="info">
                      <strong>{selected?.length}</strong> Department(s) Selected
                    </Alert>
                  </Box>
                )}
              </Box>
            </Show>
            <DataTable
              rows={departments}
              columns={getHeadCells({ isWriteAllowed })}
              selected={selected}
              setSelected={setSelected}
              count={departments?.length || 0}
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

export default memo(Departments);
