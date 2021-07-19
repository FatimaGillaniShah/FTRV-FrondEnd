import React, { memo, useState } from 'react';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useAuthContext } from '../../../context/authContext';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import WrapInCard from '../../layout/wrapInCard';
import { ROLES } from '../../../utils/constants';
import { TableButtons } from './tableButtons';
import DataTable from '../../dataTable';
import { headCells } from './columns';
import { Search } from '../../search/search';
import Filters from './filters';
import Show from '../../show';

function RingGroup({
  selected,
  data,
  setSelected,
  onHandleDelete,
  toggleValues,
  alignment,
  onHandleToggleChange,
  initialFilterValues,
}) {
  const [filterCheck, setFilterCheck] = useState(false);
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const handleSwitchChange = ({ target }) => {
    setFilterCheck(target.checked);
  };

  return (
    <>
      <WrapInBreadcrumbs>
        <Box width={1}>
          <WrapInCard mb={8}>
            <Box display="flex">
              <Search
                name="Ring Group"
                onHandleSwitchChange={handleSwitchChange}
                checked={filterCheck}
                toggleValues={toggleValues}
                alignment={alignment}
                onHandleToggleChange={onHandleToggleChange}
              />
            </Box>
            <Box mt={2}>
              <Show IF={filterCheck}>
                <Filters initialFilterValues={initialFilterValues} />
              </Show>
            </Box>
          </WrapInCard>
          <WrapInCard>
            <Show IF={role === ROLES.ADMIN}>
              <Box mt={4}>
                <TableButtons
                  onHandleDelete={onHandleDelete}
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
            <DataTable
              data={data}
              headCells={headCells}
              setSelected={setSelected}
              selected={selected}
              count={data?.length || 0}
              sortColumn="name"
            />
          </WrapInCard>
        </Box>
      </WrapInBreadcrumbs>
    </>
  );
}

RingGroup.propTypes = {
  selected: PropTypes.array,
  data: PropTypes.array,
  setSelected: PropTypes.array,
  onHandleDelete: PropTypes.func,
  toggleValues: PropTypes.array,
  alignment: PropTypes.string,
  onHandleToggleChange: PropTypes.func,
  initialFilterValues: PropTypes.object,
};

export default memo(RingGroup);
