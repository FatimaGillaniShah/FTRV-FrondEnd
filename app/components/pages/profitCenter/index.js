import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useAuthContext } from '../../../context/authContext';
import WrapInCard from '../../layout/wrapInCard';
import { ROLES } from '../../../utils/constants';
import { TableButtons } from './tableButtons';
import DataTable from '../../dataTable';
import { Search } from '../../search/search';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { headCells } from './columns';
import Show from '../../show';

function ProfitCenter({
  // <data,
  selected,
  onHandleSearch,
  setSelected,
  onHandleSwitchChange,
  onHandleDelete,
  page,
  query,
  loading,
  setPage,
}) {
  const data = [
    {
      id: 44,
      locationName: 'Fun Town RV Cleburne Super Store',
      location: '2200 U.S. 67 East Business Cleburne, Texas 76031',
      profitCenterNumber: 1,
      ProfitCenterName: 'CLE',
      faxNumber: '76643',
      phoneNumber: '817 - 645 - 8100',
      generalManagerName: 'Raul Ramierz',
    },
    {
      id: 41,
      locationName: 'Fun Town RV Waco',
      location: '777 Enterprise Blvd Hewitt, Texas 76643',
      profitCenterNumber: 4,
      ProfitCenterName: 'WAC',
      faxNumber: '76643',
      phoneNumber: '254-400-2900',
      generalManagerName: 'Hector Martinez',
    },
  ];
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  return (
    <WrapInBreadcrumbs>
      <Box width={1}>
        <WrapInCard mb={8}>
          <Box display="flex">
            <Search
              name="Profit Center"
              showToggle={false}
              onHandleSearch={onHandleSearch}
              onHandleSwitchChange={onHandleSwitchChange}
              initialValues={query}
              showFilter={false}
            />
          </Box>
        </WrapInCard>
        <WrapInCard>
          <Show IF={role === ROLES.ADMIN}>
            <Box mt={4}>
              <TableButtons
                loading={loading}
                numSelected={selected?.length}
                onHandleDelete={onHandleDelete}
              />
              <Show IF={selected?.length > 0}>
                <Box my={4}>
                  <Alert severity="info">
                    <strong>{selected?.length}</strong> Profit Center(s)
                    Selected
                  </Alert>
                </Box>
              </Show>
            </Box>
          </Show>
          <DataTable
            rows={data}
            columns={headCells}
            setSelected={setSelected}
            selected={selected}
            count={data?.length || 0}
            sortColumn="locationName"
            disableSelectionOnClick
            page={page}
            setPage={setPage}
          />
        </WrapInCard>
      </Box>
    </WrapInBreadcrumbs>
  );
}

ProfitCenter.propTypes = {
  selected: PropTypes.array,
  data: PropTypes.array,
  setSelected: PropTypes.array,
  onHandleDelete: PropTypes.func,
};

export default memo(ProfitCenter);
