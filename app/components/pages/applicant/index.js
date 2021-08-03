import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import PropTypes from 'prop-types';
import { useAuthContext } from '../../../context/authContext';
import WrapInCard from '../../layout/wrapInCard';
import { ROLES } from '../../../utils/constants';
import { TableButtons } from './tableButtons';
import DataTable from '../../dataTable';
import { headCells } from './columns';
import Show from '../../show';

function Applicant({
  selected,
  data,
  setSelected,
  onHandleDelete,
  page,
  setPage,
}) {
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  return (
    <Box width={1}>
      <WrapInCard>
        <Show IF={role === ROLES.ADMIN}>
          <Box mt={4}>
            <TableButtons
              numSelected={selected?.length}
              onHandleDelete={onHandleDelete}
            />
            <Show IF={selected?.length > 0}>
              <Box my={4}>
                <Alert severity="info">
                  <strong>{selected?.length}</strong> Applicant(s) Selected
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
          sortColumn="name"
          disableSelectionOnClick
          page={page}
          setPage={setPage}
        />
      </WrapInCard>
    </Box>
  );
}

Applicant.propTypes = {
  selected: PropTypes.array,
  data: PropTypes.array,
  setSelected: PropTypes.array,
  onHandleDelete: PropTypes.func,
};

export default memo(Applicant);
