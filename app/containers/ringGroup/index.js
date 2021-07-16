import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { Alert } from '@material-ui/lab';
import Box from '@material-ui/core/Box';
import { useQuery } from 'react-query';
import WrapInCard from '../../components/layout/wrapInCard';
import DataTable from '../../components/dataTable';
import { useAuthContext } from '../../context/authContext';
import { headCells } from '../../components/pages/ringGroup/columns';
import { Loading } from '../../components/loading';
import { ROLES } from '../../utils/constants';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import TableButtons from '../../components/pages/ringGroup/tableButtons';
import Filters from '../../components/pages/ringGroup/filters';
import Show from '../../components/show';
import { useDeleteRingGroup } from '../../hooks/ringGroup';
import { getRingGroups } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { Modal } from '../../utils/helper';
import { Search } from '../../components/search/search';

function RingGroupContainer() {
  const [selected, setSelected] = useState([]);
  const [checked, setChecked] = useState(false);
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const { data, isLoading: isListLoading } = useQuery(
    keys.ringGroups,
    getRingGroups
  );
  const handleSwitchChange = ({ target }) => {
    setChecked(target.checked);
  };

  const { mutate, isLoading } = useDeleteRingGroup({
    callbackFn: () => setSelected([]),
  });

  const handleDelete = () => {
    if (selected.length) {
      Modal.fire().then(({ isConfirmed }) => {
        if (isConfirmed) {
          mutate(selected);
        }
      });
    }
  };
  return (
    <>
      <Helmet>
        <title> Ring Group</title>
      </Helmet>
      <WrapInBreadcrumbs>
        <Box width={1}>
          <WrapInCard mb={8}>
            <Box display="flex">
              <Search
                name="Ring Group"
                onHandleSwitchChange={handleSwitchChange}
                checked={checked}
              />
            </Box>
            <Box mt={2}>
              <Show IF={checked}>
                <Filters />
              </Show>
            </Box>
          </WrapInCard>
          <WrapInCard>
            <Show IF={role === ROLES.ADMIN}>
              <Box mt={4}>
                <TableButtons
                  onHandleDelete={handleDelete}
                  numSelected={selected.length}
                />
                <Show IF={selected.length > 0}>
                  <Box my={4}>
                    <Alert severity="info">
                      <strong>{selected.length}</strong> Ring Group(s) Selected
                    </Alert>
                  </Box>
                </Show>
              </Box>
            </Show>
            <Show IF={isListLoading || isLoading}>
              <Loading />
            </Show>
            <Show IF={!isListLoading || !isLoading}>
              <DataTable
                data={data?.data?.data?.rows}
                headCells={headCells}
                setSelected={setSelected}
                selected={selected}
                count={data?.length || 0}
              />
            </Show>
          </WrapInCard>
        </Box>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(RingGroupContainer);
