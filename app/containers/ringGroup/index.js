import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import Box from '@material-ui/core/Box';
import { Alert } from '@material-ui/lab';
import { useHistory } from 'react-router-dom';
import { headCells } from '../../components/pages/ringGroup/columns';
import WrapInCard from '../../components/layout/wrapInCard';
import DataTable from '../../components/dataTable';
import TableButtons from '../../components/pages/ringGroup/tableButtons';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import Search from '../../components/pages/directory/search';
import Filters from '../../components/pages/ringGroup/filters';
import { navigateTo } from '../../utils/helper';
import Show from '../../components/show';

function RingGroupContainer() {
  const history = useHistory();
  const [selected, setSelected] = useState([]);
  const [alignment, setAlignment] = useState('ringGroup');
  const [checked, setChecked] = useState(false);
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const data = [];

  const handleSwitchChange = ({ target }) => {
    setChecked(target.checked);
  };
  const toggleValues = [
    {
      value: 'directory',
      label: 'Directory',
    },
    {
      value: 'ringGroup',
      label: 'Ring Group',
    },
  ];
  const handleToggleChange = (event, toggleAlignment) => {
    const alignmentValue = toggleAlignment;
    if (!alignment) {
      setAlignment(alignment);
      navigateTo(history, '/directory');
    }
    if (alignmentValue === 'directory') {
      navigateTo(history, '/directory');
    } else if (alignmentValue === 'ringGroup') {
      navigateTo(history, '/ring-group');
    }
    setAlignment(alignmentValue);
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
                toggleValues={toggleValues}
                alignment={alignment}
                onHandleToggleChange={handleToggleChange}
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
                <TableButtons numSelected={selected.length} />
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
            />
          </WrapInCard>
        </Box>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(RingGroupContainer);
