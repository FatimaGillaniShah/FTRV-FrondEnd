import { Box, Button, Hidden, FormLabel } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import TitleIcon from '@material-ui/icons/Title';
import DescriptionIcon from '@material-ui/icons/Description';
import MuiDatePickerInput from 'components/muiDatePickerInput';
import { Field, Form, Formik } from 'formik';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import NotificationImportantIcon from '@material-ui/icons/NotificationImportant';
import { ANNOUNCEMENT_STATUS } from '../../../utils/constants';
import FormikRadioGroup from '../../muiRadioButtons';
import { H4 } from '../../typography';
import { yupAnnouncementFormValidation } from './yupAnnouncementFormValidation';
import Select from '../../muiSelect';
import { Input } from '../../index';

function CreateAnnouncement({
  initialData,
  onUpdateAnnouncement,
  formType = 'add',
}) {
  const options = [
    { value: 'high', label: 'High' },
    { value: 'medium', label: 'Medium' },
    { value: 'low', label: 'Low' },
  ];
  const statusOptions = Object.keys(ANNOUNCEMENT_STATUS).map(
    (val) => ANNOUNCEMENT_STATUS[val]
  );

  const history = useHistory();
  const formHeadings = {
    add: 'Create New Announcement',
    edit: 'Update Announcement Data',
  };
  const navigateTo = () => {
    history.push('/announcement');
  };

  const yupValidation = yupAnnouncementFormValidation;

  return (
    <>
      <Formik
        initialValues={initialData}
        onSubmit={async (values) => {
          try {
            const data = values;
            await onUpdateAnnouncement(data);
          } catch (err) {
            // ...
          }
        }}
        validationSchema={yupValidation}
      >
        {({ values }) => (
          <Form>
            <Box
              flexWrap="wrap"
              flexDirection="row"
              p={4}
              pr={[0, 36]}
              display="flex"
              justifyContent="center"
              alignItems="center"
            >
              <Box width={[1, '70%']}>
                <Box width={1} pt={10} flexWrap="wrap" display="flex" px={2}>
                  <Box width={1} textAlign="center">
                    <H4>{formHeadings[formType]}</H4>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="title"
                      variant="outlined"
                      OutlinedInputPlaceholder="*Title"
                      Icon={TitleIcon}
                      appendIcon
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Input
                      name="description"
                      variant="outlined"
                      OutlinedInputPlaceholder="*Description"
                      Icon={DescriptionIcon}
                      appendIcon
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <MuiDatePickerInput
                      name="startTime"
                      variant="outlined"
                      label="Start Time"
                    />
                  </Box>

                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <MuiDatePickerInput
                      name="endTime"
                      variant="outlined"
                      label="End Time"
                    />
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <Select
                      name="status"
                      selectId="status"
                      labelId="status"
                      selectName="status"
                      formControlProps={{ variant: 'outlined' }}
                      label="Select User Type"
                      selectedValue={values.status}
                      options={statusOptions}
                    />
                  </Box>

                  <Box width={[1, 1 / 2]} mt={10} px={3}>
                    <FormLabel component="legend">Priority</FormLabel>
                    <Field
                      name="priority"
                      component={FormikRadioGroup}
                      options={options}
                    />
                  </Box>

                  <Hidden smDown>
                    <Box width={[1, 1 / 2]} mt={10} px={3}></Box>
                  </Hidden>
                  <Box
                    display="flex"
                    flexWrap="wrap"
                    justifyContent="center"
                    width={1}
                    mt={10}
                  >
                    <Box mb={7}>
                      <Button
                        variant="contained"
                        color="secondary"
                        type="submit"
                        startIcon={<NotificationImportantIcon />}
                      >
                        {`${formType === 'add' ? 'Create' : 'Update'}`}
                      </Button>
                    </Box>
                    <Box mx={1}>
                      <Button
                        onClick={() => navigateTo()}
                        startIcon={<ClearIcon fontSize="small" />}
                      >
                        Cancel
                      </Button>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default memo(CreateAnnouncement);
