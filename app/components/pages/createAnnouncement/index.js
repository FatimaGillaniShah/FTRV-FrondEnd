import { Box, Button, Hidden } from '@material-ui/core';
import ClearIcon from '@material-ui/icons/Clear';
import TitleIcon from '@material-ui/icons/Title';
import DescriptionIcon from '@material-ui/icons/Description';
import { Input } from 'components';
import MuiDatePickerInput from 'components/muiDatePickerInput';
import { Form, Formik } from 'formik';
import React, { memo } from 'react';
import { useHistory } from 'react-router-dom';
import RadioButtons from './announcementRadioButtons';
import { H4 } from '../../typography';
import { yupAnnouncementFormValidation } from './yupAnnouncementFormValidation';

function CreateAnnouncement({ formType = 'add' }) {
  const history = useHistory();

  const formHeadings = {
    add: 'Create New Announcement',
    edit: 'Update Announcement Data',
  };

  const yupValidation = yupAnnouncementFormValidation;

  return (
    <>
      <Formik
        initialValues={{
          title: '',
          description: '',
          expiryDate: '',
          startDate: '',
          endDate: '',
        }}
        validationSchema={yupValidation}
      >
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
                  <H4>{`${formHeadings[formType]}`}</H4>
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
                    name="startDate"
                    variant="outlined"
                    label="Start Date"
                  />
                </Box>
                <Box width={[1, 1 / 2]} mt={10} px={3}>
                  <MuiDatePickerInput
                    name="endDate"
                    variant="outlined"
                    label="End Date"
                  />
                </Box>

                <Box width={[1, 1 / 2]} mt={10} px={3}>
                  <MuiDatePickerInput
                    name="expiryDate"
                    variant="outlined"
                    label="Expiry Date"
                  />
                </Box>
                <Box width={[1, 1 / 2]} mt={10} px={3}>
                  <RadioButtons />
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
                  <Box mx={1} mb={7}>
                    <Button variant="contained" color="secondary" type="submit">
                      {`${formType === 'add' ? 'Create' : 'Update'}`}
                    </Button>
                  </Box>
                  <Box mx={1}>
                    <Button
                      onClick={() => {
                        history.push('/announcement');
                      }}
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
      </Formik>
    </>
  );
}

export default memo(CreateAnnouncement);
