import { Box, Button } from '@material-ui/core';
import React, { memo, useState } from 'react';
import AddIcon from '@material-ui/icons/Add';
import { Input } from 'components';
import { Form, Formik } from 'formik';
import BusinessIcon from '@material-ui/icons/Business';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import Select from '../muiSelect';
import MuiDialog from '../muiDialog';
import { useStyles } from './style';
import { locationSchema } from './schema';
import { useCreateLocation } from '../../hooks/locationMutation';
import { keys } from '../../state/queryKeys';
import { getLocations } from '../../state/queryFunctions';
import Show from '../show';
import { usePermission } from '../../hooks/permission';
import { features, PERMISSIONS } from '../../utils/constants';

function LocationWithModal({
  modal,
  variant,
  selectedValue,
  initialValues,
  options,
  ...props
}) {
  const [open, setOpen] = useState(false);
  const isReadAllowed = usePermission(
    `${features.LOCATION}-${PERMISSIONS.READ}`
  );
  const isWriteAllowed = usePermission(
    `${features.LOCATION}-${PERMISSIONS.WRITE}`
  );
  const { mutate } = useCreateLocation();
  const { data: locations, isLoading } = useQuery(
    keys.locations,
    getLocations,
    {
      enabled: isReadAllowed,
    }
  );
  const handleSubmit = (values, { resetForm }) => {
    mutate(values);
    resetForm();
    setOpen(!open);
  };
  const handleDialogue = () => {
    setOpen(!open);
  };
  const locationOptions = locations?.data.data.rows.map((val) => ({
    value: val.id,
    label: val.name,
  }));

  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={initialValues}
        validationSchema={locationSchema}
        onSubmit={handleSubmit}
      >
        {({ submitForm }) => (
          <Form>
            <MuiDialog
              open={open}
              onClose={() => handleDialogue()}
              title="Create New Location"
              onSubmit={submitForm}
            >
              <Box
                width={[1, 1, 1 / 2]}
                py={5}
                className={classes.modalOverflow}
              >
                <Input
                  name="name"
                  variant="outlined"
                  OutlinedInputPlaceholder="*Location"
                  Icon={BusinessIcon}
                  appendIcon
                />
              </Box>
            </MuiDialog>
          </Form>
        )}
      </Formik>
      <Box>
        <Select
          selectedValue={selectedValue}
          label="Location"
          variant={variant}
          options={locationOptions || options || []}
          loading={isLoading}
          {...(options && { emptyItem: !(options.length > 0) })}
          {...props}
        />
        <Show IF={modal && isWriteAllowed}>
          <Button size="small" startIcon={<AddIcon />} onClick={handleDialogue}>
            Create new location
          </Button>
        </Show>
      </Box>
    </>
  );
}

LocationWithModal.propTypes = {
  initialValues: PropTypes.object,
  selectedValue: PropTypes.string,
  modal: PropTypes.bool,
  variant: PropTypes.string,
};
LocationWithModal.defaultProps = {
  initialValues: { name: '' },
  modal: true,
  variant: 'outlined',
};

export default memo(LocationWithModal);
