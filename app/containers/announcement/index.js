import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import { headCells } from './columns';
import WrapInCard from '../../components/layout/wrapInCard';
import DataTable from '../../components/dataTable';
import TableButtons from './tableButtons';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';

function AnnouncementContainer() {
  const [selected, setSelected] = useState([]);

  const {
    user: {
      data: { role, id },
    },
  } = useAuthContext();

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
                <TableButtons numSelected={selected.length} />
              </Box>
            )}

            <DataTable
              role={role}
              headCells={headCells}
              setSelected={setSelected}
              selected={selected}
              currentUserID={id}
            />
          </WrapInCard>
        </Box>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(AnnouncementContainer);
