import React, { memo } from 'react';
import Box from '@material-ui/core/Box';
import PropTypes from 'prop-types';
import WrapInCard from '../../layout/wrapInCard';
import DataTable from '../../dataTable';
import { getHeadCells } from './columns';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';

function Applicant({ data, page, setPage, isWriteAllowed }) {
  return (
    <Box width={1}>
      <WrapInBreadcrumbs>
        <WrapInCard>
          <DataTable
            rows={data}
            columns={getHeadCells({ isWriteAllowed })}
            count={data?.length || 0}
            sortColumn="name"
            page={page}
            setPage={setPage}
            isWriteAllowed={isWriteAllowed}
            checkboxSelection={false}
          />
        </WrapInCard>
      </WrapInBreadcrumbs>
    </Box>
  );
}

Applicant.propTypes = {
  data: PropTypes.array,
};

export default memo(Applicant);
