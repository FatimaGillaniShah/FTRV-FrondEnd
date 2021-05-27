import React, { memo, useState } from 'react';
import { Helmet } from 'react-helmet';
import { useQuery } from 'react-query';
import LocationPage from '../../components/pages/locations';
import { getLocations } from '../../state/queryFunctions';
import { keys } from '../../state/queryKeys';
import { headCells } from './columns';
import { Modal } from '../../utils/helper';
import { useDeleteLocation } from '../../hooks/location';

function Locations() {
  const [selected, setSelected] = useState([]);
  const mutation = useDeleteLocation({ callbackFn: () => setSelected([]) });
  const { data, isLoading } = useQuery(keys.locations, getLocations);
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
  return (
    <>
      <Helmet>
        <title>Locations</title>
      </Helmet>

      <LocationPage
        isLoading={isLoading}
        data={data?.data?.data?.rows}
        headCells={headCells}
        setSelected={setSelected}
        selected={selected}
        onDelete={handleDelete}
        count={data?.data?.data?.rows?.length || 0}
        sortColumn="location"
      />
    </>
  );
}

export default memo(Locations);
