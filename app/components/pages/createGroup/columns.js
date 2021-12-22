import React, { useEffect, useState } from 'react';
import {
  READ_ONLY_FEATURES,
  PERMISSIONS,
  defaultResources,
} from '../../../utils/constants';
import { Checkbox } from '../../index';
import RenderCellExpand from '../../muiDatagridCellPopup';
import RenderHeader from './renderHeader';

const ActionButtons = ({
  permission,
  resource,
  onHandleChange,
  selectedFeature,
}) => {
  const [checked, setChecked] = useState(false);
  const [feature] = selectedFeature?.filter(({ id }) => id === resource?.id);

  useEffect(() => {
    isChecked();
  }, [selectedFeature]);

  const readPermission = feature?.permissions?.includes(PERMISSIONS.READ);
  const writePermission = feature?.permissions?.includes(PERMISSIONS.WRITE);
  const isChecked = () => {
    const checkedCondition =
      (permission === PERMISSIONS.READ && readPermission) ||
      (permission === PERMISSIONS.WRITE && writePermission);
    setChecked(checkedCondition);
  };

  const readOnlyFeatures =
    READ_ONLY_FEATURES.includes(resource.slug) &&
    permission === PERMISSIONS.WRITE;
  const isDefaultResource =
    defaultResources.includes(resource.slug) && permission === PERMISSIONS.READ;

  const disabled =
    (writePermission && permission === PERMISSIONS.READ) ||
    isDefaultResource ||
    (readOnlyFeatures && permission === PERMISSIONS.WRITE);

  return (
    <Checkbox
      disabled={disabled}
      onHandleChange={(...props) =>
        onHandleChange(...props, resource, permission)
      }
      checked={checked || isDefaultResource}
    />
  );
};

const isHeaderChecked = (permission, resource, data) => {
  const isWriteChecked = [];
  resource?.filter(({ permissions, slug }) => {
    if (
      permissions.includes(PERMISSIONS.WRITE) ||
      READ_ONLY_FEATURES.includes(slug)
    ) {
      return isWriteChecked.push(true);
    }
    return false;
  });

  if (isWriteChecked.length === data.length) {
    return true;
  }
  if (resource?.length === data?.length && permission === PERMISSIONS.READ) {
    return true;
  }
  return false;
};
export const getHeadCells = ({
  onHandleChange,
  resource: selectedResources,
  onHandleHeaderChange,
  data: resources,
  match,
}) => {
  const columns = [
    {
      field: 'read',
      type: 'bool',
      renderHeader: () =>
        RenderHeader(
          PERMISSIONS.READ,
          onHandleHeaderChange,
          isHeaderChecked,
          selectedResources,
          resources
        ),
      description: 'Read',
      sortable: false,
      width: 150,

      renderCell: ({ row }) => (
        <ActionButtons
          permission={PERMISSIONS.READ}
          resource={row}
          onHandleChange={onHandleChange}
          selectedFeature={selectedResources}
          defaultResources={defaultResources}
        />
      ),
    },
    {
      field: 'write',
      type: 'bool',
      renderHeader: () =>
        RenderHeader(
          PERMISSIONS.WRITE,
          onHandleHeaderChange,
          isHeaderChecked,
          selectedResources,
          resources
        ),
      description: 'Write',
      sortable: false,
      width: 150,
      renderCell: ({ row }) => (
        <ActionButtons
          permission={PERMISSIONS.WRITE}
          resource={row}
          onHandleChange={onHandleChange}
          defaultResources={defaultResources}
          selectedFeature={selectedResources}
        />
      ),
    },
    {
      field: 'name',
      type: 'string',
      headerName: 'Features',
      description: 'Features',
      sortable: true,
      width: 350,
    },
    {
      field: 'description',
      type: 'string',
      headerName: 'Description',
      description: 'Description',
      sortable: true,
      renderCell: RenderCellExpand,
      valueFormatter: ({ row: { description } }) => description,
      width: 700,
    },
  ];

  columns?.map((value) => {
    const column = value;
    if (!match) {
      column.flex = 1;
    }
    return column;
  });
  return columns;
};
