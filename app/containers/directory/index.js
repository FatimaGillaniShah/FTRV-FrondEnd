import React, { memo, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useMutation, useQuery, useQueryClient } from 'react-query';
import Box from '@material-ui/core/Box';
import { debounce } from 'lodash';
import { useLocation, useHistory } from 'react-router-dom';
import { Toast } from 'components';
import Swal from 'sweetalert2';
import { useTheme } from '@material-ui/core/styles';
import { deleteUser, fetchUsers } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { headCells } from './columns';
import WrapInCard from '../../components/layout/wrapInCard';
import Search from '../../components/pages/directory/search';
import Filters from '../../components/pages/directory/filters';
import DataTable from '../../components/dataTable';
import TableButtons from './tableButtons';
import { Loading } from '../../components/loading';
import { useAuthContext } from '../../context/authContext';
import { ROLES } from '../../utils/constants';
import WrapInBreadcrumbs from '../../components/layout/wrapInBreadcrumbs';

function DirectoryContainer() {
  const [query, setQuery] = useState({});
  const [filters, setFilters] = useState();
  const { state } = useLocation();
  const [checked, setChecked] = useState(false);
  const [toastValue, settoastValue] = useState(null);
  const [selectedRows, setSelectedRows] = useState([]);
  const queryClient = useQueryClient();
  const theme = useTheme();
  const history = useHistory();
  const mutation = useMutation(deleteUser, {
    onSuccess: ({
      data: {
        data: { count },
      },
    }) => {
      Swal.fire('Deleted!', `${count} user deleted.`, 'success');
      queryClient.invalidateQueries(keys.getUsers({}));
    },
  });
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();

  useEffect(() => {
    if (checked) {
      setQuery('');
    }
  }, [checked]);
  const { data, isLoading } = useQuery(
    keys.getUsers({ query, filters }),
    fetchUsers,
    { refetchOnWindowFocus: false }
  );

  const handleSwitchChange = ({ target }) => {
    setChecked(target.checked);
  };

  const handleSearch = debounce(({ target: { value } }) => {
    setQuery({ searchString: value });
  }, 500);

  const handleFilterSearch = (values) => {
    setFilters(values);
  };

  useEffect(() => {
    const temp = { ...state };
    settoastValue(temp);
    history.replace({}, document.title);
  }, []);

  if (mutation.isError) {
    Swal.fire(
      '',
      'Some error occured in deleting the user. Please  try again',
      'error'
    );
  }
  useEffect(() => {
    window.addEventListener('beforeunload', () => {
      history.replace({}, '');
    });

    return () => {
      window.removeEventListener('beforeunload', () => {});
    };
  }, []);

  const handleDelete = () => {
    if (!selectedRows.length) {
      return;
    }
    Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: theme.palette.modalColors.confirm,
      cancelButtonColor: theme.palette.modalColors.cancel,
      confirmButtonText: 'Yes, delete it!',
    }).then((result) => {
      if (result.isConfirmed) {
        mutation.mutate(selectedRows);
      }
    });
  };
  return (
    <>
      {toastValue && toastValue.toastType && (
        <>
          <Toast variant={toastValue.toastType}>{toastValue.message}</Toast>
        </>
      )}

      <Helmet>
        <title>Directory Listing</title>
      </Helmet>
      <WrapInBreadcrumbs>
        {(isLoading || mutation.isLoading) && <Loading />}
        <Box width={1}>
          <WrapInCard mb={8}>
            <Box display="flex">
              <Search
                onHandleSwitchChange={handleSwitchChange}
                checked={checked}
                onHandleSearch={handleSearch}
                query={query}
              />
            </Box>
            <Box mt={8}>
              {checked && <Filters onHandleFilterSearch={handleFilterSearch} />}
            </Box>
          </WrapInCard>
          <WrapInCard>
            {role === ROLES.ADMIN && (
              <Box mt={4}>
                <TableButtons onDelete={handleDelete} />
              </Box>
            )}
            {!isLoading && (
              <DataTable
                data={data && data.data.data.rows}
                headCells={headCells}
                handleSelected={setSelectedRows}
              />
            )}
          </WrapInCard>
        </Box>
      </WrapInBreadcrumbs>
    </>
  );
}

export default memo(DirectoryContainer);
