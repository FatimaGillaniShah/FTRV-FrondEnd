import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { PERMISSIONS, READ_ONLY_FEATURES } from '../../../utils/constants';
import { Checkbox } from '../../index';
import { BodyText } from '../../typography';

const useStyles = makeStyles(() => ({
  permissionText: {
    textTransform: 'capitalize',
  },
}));

function RenderHeader(
  permission,
  onHandleHeaderChange,
  isHeaderChecked,
  selectedResources,
  resources
) {
  const classes = useStyles();
  const isWriteChecked = [];
  selectedResources?.filter(({ permissions, slug }) => {
    if (
      permissions.includes(PERMISSIONS.WRITE) ||
      READ_ONLY_FEATURES.includes(slug)
    ) {
      isWriteChecked.push(true);
    }
    return false;
  });

  const isWriteAllChecked =
    isWriteChecked.length < resources.length &&
    isWriteChecked.length > READ_ONLY_FEATURES.length;

  const indeterminate =
    permission === PERMISSIONS.WRITE
      ? !!isWriteAllChecked
      : selectedResources?.length !== resources?.length;
  return (
    <>
      <Checkbox
        onHandleChange={(...props) =>
          onHandleHeaderChange(...props, permission)
        }
        checked={isHeaderChecked(permission, selectedResources, resources)}
        indeterminate={indeterminate}
      />
      <BodyText
        color="light"
        fontWeight="fontWeightMedium"
        className={classes.permissionText}
      >
        {permission}
      </BodyText>
    </>
  );
}
export default RenderHeader;
