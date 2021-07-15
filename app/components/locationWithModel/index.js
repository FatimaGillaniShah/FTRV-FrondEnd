import { Box, Button } from '@material-ui/core';
import React, { memo, useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/Add';
import { Input } from 'components';
import { Form, Formik } from 'formik';
import { string, object } from 'yup';
import BusinessIcon from '@material-ui/icons/Business';
import PropTypes from 'prop-types';
import Select from '../muiSelect';
import MuiDialog from '../muiDialog';

const useStyles = makeStyles((theme) => ({
  modelLink: {
    cursor: 'pointer',
    paddingTop: theme.spacing(1),
  },
}));

function LocationWithModel({
  selectVariant,
  showCreateButton,
  selectedValue,
  options,
  initialDialogData,
  variant,
}) {
  const locationSchema = object().shape({
    location: string()
      .required('*Location Required')
      .noWhitespace()
      .typeError('* This field cannot contain only blankspaces'),
  });

  const [openLocDialog, setOpenLocDialog] = useState(false);
  const handleDialogState = () => {
    setOpenLocDialog(!openLocDialog);
  };

  const classes = useStyles();
  return (
    <>
      <Formik
        initialValues={initialDialogData}
        validationSchema={locationSchema}
      >
        <Form>
          <MuiDialog
            open={openLocDialog}
            onClose={() => handleDialogState()}
            title="Create New Location"
          >
            <Box width={[1, 1, 1 / 2]} py={5}>
              <Input
                name="location"
                variant={variant}
                OutlinedInputPlaceholder="*Location"
                Icon={BusinessIcon}
                appendIcon
              />
            </Box>
          </MuiDialog>
        </Form>
      </Formik>
      <Box>
        <Select
          name="locationId"
          variant={selectVariant}
          selectedValue={selectedValue}
          label="Location"
          options={options}
        />
        {showCreateButton && (
          <Box className={classes.modelLink}>
            <Button startIcon={<AddIcon />} onClick={handleDialogState}>
              Create new location
            </Button>
          </Box>
        )}
      </Box>
    </>
  );
}

LocationWithModel.propTypes = {
  options: PropTypes.array,
  initialDialogData: PropTypes.object,
  selectedValue: PropTypes.string,
  variant: PropTypes.string,
  showCreateButton: PropTypes.bool,
};
LocationWithModel.defaultProps = {
  variant: 'outlined',
  showCreateButton: true,
};

export default memo(LocationWithModel);
