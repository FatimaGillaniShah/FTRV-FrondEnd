import { Box, Button } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import { string, object, date } from 'yup';

import EventNoteIcon from '@material-ui/icons/EventNote';
import ClearIcon from '@material-ui/icons/Clear';
import TitleIcon from '@material-ui/icons/Title';
import PropTypes from 'prop-types';
import {
  KeyboardDateTimePicker,
  MuiPickersUtilsProvider,
} from '@material-ui/pickers';
import DateFnsUtils from '@date-io/date-fns';
import { Link } from 'react-router-dom';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import WrapInCard from '../../layout/wrapInCard';
import { Input } from '../../index';
import { BodyTextLarge, H5 } from '../../typography';

const useStyles = makeStyles((theme) => ({
  label: {
    color: theme.palette.text.info,
  },
  dateColor: {
    color: theme.palette.text.dark,
  },
  linkStyle: { textDecoration: 'none' },
}));

export function CreateEventPage({ onHandleSubmit, id, initialValues }) {
  const classes = useStyles();
  return (
    <WrapInBreadcrumbs>
      <WrapInCard mb={8}>
        <Box ml={3}>
          <Box my={7}>
            <H5> {id ? 'Update' : 'Create'} New Event </H5>
          </Box>
          <Formik
            key="addusefullink"
            enableReinitialize
            initialValues={initialValues}
            validationSchema={object().shape({
              name: string().required('*Title Required'),
              startDate: date().required(),
              endDate: date().required(),
              description: string(),
            })}
            onSubmit={(values) => {
              onHandleSubmit(values);
            }}
          >
            {({ setFieldValue, values }) => (
              <Form>
                <Box>
                  <Box display="flex" flexDirection="column" pb={10}>
                    <Box width={[1, 1 / 3]} my={5}>
                      <Input
                        variant="outlined"
                        OutlinedInputPlaceholder="Title*"
                        name="name"
                        appendIcon
                        Icon={TitleIcon}
                        IconClickable
                      />
                    </Box>
                    <Box width={[1, 1 / 3]}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                          margin="normal"
                          id="startDate"
                          name="startDate"
                          label={
                            <BodyTextLarge className={classes.label}>
                              Start Date*
                            </BodyTextLarge>
                          }
                          disablePast
                          inputVariant="outlined"
                          // format="MM-dd-yyyy"
                          format="yyyy/MM/dd hh:mm a"
                          fullWidth
                          value={values.startDate}
                          InputProps={{ className: classes.dateColor }}
                          onChange={(value) => {
                            setFieldValue('startDate', value);
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Box>
                    <Box width={[1, 1 / 3]}>
                      <MuiPickersUtilsProvider utils={DateFnsUtils}>
                        <KeyboardDateTimePicker
                          margin="normal"
                          id="endDate"
                          name="endDate"
                          label={
                            <BodyTextLarge className={classes.label}>
                              End Date*
                            </BodyTextLarge>
                          }
                          disablePast
                          inputVariant="outlined"
                          // format="MM-dd-yyyy"
                          format="yyyy/MM/dd hh:mm a"
                          fullWidth
                          value={values.endDate}
                          InputProps={{ className: classes.dateColor }}
                          onChange={(value) => {
                            setFieldValue('endDate', value);
                          }}
                        />
                      </MuiPickersUtilsProvider>
                    </Box>
                    <Box width={[1, 1 / 3]} my={5}>
                      <Input
                        variant="outlined"
                        OutlinedInputPlaceholder="Description"
                        name="description"
                        appendIcon
                        Icon={EventNoteIcon}
                        IconClickable
                        fullWidth
                        multiline
                        rows={4}
                        rowsMax={10}
                      />
                    </Box>
                  </Box>
                  <Box display="flex">
                    <Box mb={5}>
                      <Button
                        type="submit"
                        color="secondary"
                        variant="contained"
                        startIcon={<SaveIcon />}
                      >
                        {id ? 'Update' : 'Create'}
                      </Button>
                    </Box>
                    <Box ml={2}>
                      <Link to="/events" className={classes.linkStyle}>
                        <Button variant="text" startIcon={<ClearIcon />}>
                          Cancel
                        </Button>
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Form>
            )}
          </Formik>
        </Box>
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
}

export default memo(CreateEventPage);

CreateEventPage.propTypes = {
  initialValues: PropTypes.object,
};
CreateEventPage.defaultProps = {
  initialValues: {
    name: '',
    startDate: new Date(),
    endDate: new Date(),
    description: '',
  },
};
