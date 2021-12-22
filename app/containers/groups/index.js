import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { debounce } from 'lodash';
import { Loading } from '../../components/loading';
import { Modal } from '../../utils/helper';
import { features, PERMISSIONS } from '../../utils/constants';
import Groups from '../../components/pages/groups';
import { useDeleteGroup, useListGroup } from '../../hooks/group';
import { usePermission } from '../../hooks/permission';

function GroupsContainer() {
  const [selected, setSelected] = useState([]);
  const [page, setPage] = useState(0);

  const isWriteAllowed = usePermission(
    `${features.GROUP}-${PERMISSIONS.WRITE}`
  );
  const [filters, setFilter] = useState({ name: '' });
  const isReadAllowed = usePermission(`${features.GROUP}-${PERMISSIONS.READ}`);
  const { data: groupsResponse, isLoading: isGroupLoading } = useListGroup({
    enabled: isReadAllowed,
    filters,
  });

  const groupData = groupsResponse?.data?.data;
  const handleSearch = debounce(({ target }) => {
    setFilter({ name: target.value });
  }, 500);

  const { mutate, isLoading } = useDeleteGroup({
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
        <title>Groups</title>
      </Helmet>
      {isGroupLoading ? (
        <Loading />
      ) : (
        <Groups
          data={groupData}
          isWriteAllowed={isWriteAllowed}
          loading={isLoading}
          selected={selected}
          setSelected={setSelected}
          onHandleDelete={handleDelete}
          setPage={setPage}
          filters={filters}
          onHandleSearch={handleSearch}
          page={page}
        />
      )}
    </>
  );
}

export default memo(GroupsContainer);
