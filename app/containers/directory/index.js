import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import Box from '@material-ui/core/Box';
import { debounce } from 'lodash';
import { useHistory } from 'react-router-dom';
import { Alert } from 'components';
import { useMediaQuery } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';
import { fetchUsers } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { getHeadCells } from './columns';
import WrapInCard from '../../components/layout/wrapInCard';
import Search from '../../components/search/search';
import Filters from '../../components/pages/directory/filters';
import DataTable from '../../components/dataTable';
import TableButtons from './tableButtons';
import { Loading } from '../../components/loading';
import { TABLE_PAGE_SIZE, features, PERMISSIONS } from '../../utils/constants';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';
import { useStyles } from './styles';
import { Modal, navigateTo } from '../../utils/helper';
import { useDeleteUser } from '../../hooks/user';
import Show from '../../components/show';
import { useSharedState } from '../../hooks/sharedState';
import { usePermission } from '../../hooks/permission';

function DirectoryContainer() {
  const [query, setQuery] = useState({ searchString: '' });
  const [pageNumber, setPageNumber] = useState(1);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(TABLE_PAGE_SIZE);
  const [filters, setFilters] = useState();
  const [checked, setChecked] = useState(false);
  const [selected, setSelected] = useSharedState(keys.selectedRow, []);
  const [alignment, setAlignment] = useState('directory');
  const [sortOrder, setSortOrder] = useState('asc');
  const [sortColumn, setSortColumn] = useState('email');
  const history = useHistory();
  const isServerSide = true;
  const classes = useStyles();
  const [fieldFunc, setFieldFunc] = useState();
  const mutation = useDeleteUser({ callbackFn: () => setSelected([]) });
  const isWriteAllowed = usePermission(
    `${features.DIRECTORY}-${PERMISSIONS.WRITE}`
  );

  useEffect(() => {
    if (checked) {
      fieldFunc?.setFormikField('searchString', '');
      setQuery({ searchString: '' });
    }
    setSelected([]);
    return () => setSelected([]);
  }, [checked, sortOrder, sortColumn]);

  const { data, isLoading } = useQuery(
    keys.getUsers({
      query,
      filters,
      sortOrder,
      sortColumn,
      pageNumber,
      pageSize,
      detail: true,
    }),
    fetchUsers,
    {
      keepPreviousData: true,
    }
  );
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('lg'));

  const tableData = data?.data?.data;
  const handleSwitchChange = ({ target }) => {
    onClear();
    setChecked(target.checked);
  };
  const handleSearch = debounce((e, setFieldValue) => {
    setPage(0);
    setPageNumber(1);
    setFieldFunc({ setFormikField: setFieldValue });
    setQuery({ searchString: e.target.value });
  }, 500);

  const handleFilterSearch = (values) => {
    setPage(0);
    setPageNumber(1);
    setFilters(values);
  };
  const onClear = () => {
    setFilters([]);
  };

  const onChangeSort = (order, property) => {
    if (isServerSide) {
      if (property === 'fullName') {
        setSortColumn('firstName');
      } else {
        setSortColumn(property);
      }
      setSortOrder(order);
    }
  };

  useEffect(() => {
    history.replace({}, '');
  }, []);

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
  const handleServerPageNumber = ({ currentPage }) => {
    setPageNumber(currentPage);
  };
  const handleServerPageSize = ({ rowPerPage }) => {
    setPageSize(rowPerPage);
  };
  const toggleValues = [
    {
      value: 'directory',
      label: 'Directory',
    },
    {
      value: 'ring-group',
      label: 'Ring Group',
    },
  ];
  const handleToggleChange = (event, toggleAlignment) => {
    const alignmentValue = toggleAlignment;
    if (!alignmentValue) {
      setAlignment(alignment);
      navigateTo(history, `/${alignment}`);
    } else {
      setAlignment(alignmentValue);
      navigateTo(history, `/${alignmentValue}`);
    }
  };

  return (
    <>
      <Helmet>
        <title>Directory Listing</title>
      </Helmet>
      <Show IF={isLoading || mutation.isLoading}>
        <Loading />
      </Show>
      <Show IF={!isLoading && !mutation.isLoading}>
        <WrapInBreadcrumbs>
          <Box width={1}>
            <WrapInCard mb={8}>
              <Box display="flex">
                <Search
                  name="Directory"
                  initialValues={query}
                  onHandleSwitchChange={handleSwitchChange}
                  checked={checked}
                  showToggle
                  alignment={alignment}
                  onHandleSearch={handleSearch}
                  toggleValues={toggleValues}
                  onHandleToggleChange={handleToggleChange}
                />
              </Box>
              <Box mt={2}>
                <Show IF={checked}>
                  <Filters
                    onHandleFilterSearch={handleFilterSearch}
                    onClear={onClear}
                  />
                </Show>
              </Box>
            </WrapInCard>
            <WrapInCard>
              <Show IF={isWriteAllowed}>
                <Box mt={4}>
                  <TableButtons
                    onDelete={handleDelete}
                    numSelected={selected.length}
                    loading={mutation.isLoading}
                    selected={selected}
                  />
                </Box>
              </Show>
              <Show IF={selected.length > 0}>
                <Box my={4}>
                  <Alert severity="info" className={classes.alertPadding}>
                    <strong>{selected.length}</strong> User(s) Selected
                  </Alert>
                </Box>
              </Show>

              {!isLoading && !mutation.isLoading && (
                <DataTable
                  rows={tableData?.rows}
                  columns={getHeadCells({ isWriteAllowed, match })}
                  setSelected={setSelected}
                  selected={selected}
                  onChangeSort={onChangeSort}
                  sortOrder={sortOrder}
                  sortColumn={sortColumn}
                  count={tableData?.count || 0}
                  isServerSide={isServerSide}
                  handleServerPageNumber={handleServerPageNumber}
                  handleServerPageSize={handleServerPageSize}
                  matchUserIdWithIDS
                  page={page}
                  isWriteAllowed={isWriteAllowed}
                  setPage={setPage}
                />
              )}
            </WrapInCard>
          </Box>
        </WrapInBreadcrumbs>
      </Show>
    </>
  );
}

export default memo(DirectoryContainer);
