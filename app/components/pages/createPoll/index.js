import React from 'react';
import { Formik, Form, FieldArray } from 'formik';
import Box from '@material-ui/core/Box';
import { string, object, date, ref, array } from 'yup';
import ClearIcon from '@material-ui/icons/Clear';
import AddIcon from '@material-ui/icons/Add';
import PersonIcon from '@material-ui/icons/Person';
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import SaveIcon from '@material-ui/icons/Save';
import { useHistory } from 'react-router';
import PropTypes from 'prop-types';
import { Divider } from '@material-ui/core';
import { STATUS, POLL_OPTIONS_LIMIT } from '../../../utils/constants';
import { DatePicker, Input, Select, WrapInCard, Button } from '../../index';
import WrapInBreadcrumbs from '../../layout/wrapInBreadcrumbs';
import { BodyTextLarge, H4 } from '../../typography';

import { navigateTo } from '../../../utils/helper';

const pollSchema = object().shape({
  name: string()
    .required('*Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  question: string()
    .required('*Required')
    .max(255, '* Too long')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  options: array().of(
    object().shape({
      name: string()
        .required('*Option is required')
        .noWhitespace()
        .typeError('* This field cannot contain only blankspaces'),
    })
  ),
  startDate: date()
    .min(
      new Date().toDateString(),
      ({ min }) => `Start Date must be equal or greater to ${min}`
    )
    .required('*Start Date Required'),
  endDate: date()
    .required('*End Date Required')
    .min(ref('startDate'), 'End date should be greater than start date'),
});

export const CreatePollPage = ({
  onHandleSubmit,
  id,
  initialValues,
  loading,
}) => {
  const { options } = initialValues;
  let voted = [];
  voted = options.filter((option) => option.votes > 0);
  const history = useHistory();
  const handleRemoveField = (values, remove, setFieldValue, index) => {
    if (values[`options-${index + 2}`]) {
      setFieldValue(`options-${index + 1}`, values[`options-${index + 2}`]);
      setFieldValue(`options-${index + 2}`, undefined);
      remove(index + 1);
    } else {
      setFieldValue(`options-${index + 1}`, undefined);
      remove(index);
    }
  };
  const statusOptions = Object.keys(STATUS).map((val) => STATUS[val]);
  return (
    <WrapInBreadcrumbs>
      <WrapInCard>
        <Formik
          initialValues={initialValues}
          validationSchema={pollSchema}
          onSubmit={onHandleSubmit}
          render={({ values, setFieldValue }) => (
            <Form>
              <Box display="flex" justifyContent="center" alignItems="center">
                <Box pt={15} width={[1, 1, '65%']}>
                  <Box display="flex" justifyContent="center">
                    <H4>{id ? 'Update' : 'Create New'} Poll</H4>
                  </Box>
                  <Box display="flex" flexWrap="wrap">
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <Input
                        OutlinedInputPlaceholder="*Name"
                        name="name"
                        variant="outlined"
                        Icon={PersonIcon}
                        appendIcon
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <Input
                        OutlinedInputPlaceholder="*Question"
                        name="question"
                        variant="outlined"
                        Icon={HelpOutlineIcon}
                        appendIcon
                      />
                    </Box>
                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <DatePicker
                        name="startDate"
                        label="Start Date*"
                        disablePast
                      />
                    </Box>

                    <Box width={[1, 1 / 2]} mt={10} px={3}>
                      <DatePicker
                        label="*End Date"
                        name="endDate"
                        disablePast
                      />
                    </Box>
                  </Box>
                  <Box width={[1, 1 / 2]} mt={10} px={3} mb={5}>
                    <Select
                      name="status"
                      selectName="status"
                      selectId="status"
                      label="Status"
                      selectedValue={values.status}
                      options={statusOptions}
                    />
                  </Box>
                  <Box px={20}>
                    <Divider />
                  </Box>
                  <Box ml={3} mt={5}>
                    <BodyTextLarge>Specify Poll Options</BodyTextLarge>
                  </Box>
                  <FieldArray
                    name="options"
                    render={({ remove, push }) => (
                      <Box>
                        <Box
                          display="flex"
                          justifyContent="space-between"
                          flexWrap="wrap"
                          flexDirection={['column', 'row']}
                          mb={10}
                        >
                          {values.options.map((val, index) => (
                            <Box
                              width={[1, 1 / 2]}
                              mt={10}
                              px={3}
                              display="flex"
                            >
                              <Box flex="1">
                                <Input
                                  OutlinedInputPlaceholder={`Option ${
                                    index + 1
                                  }`}
                                  name={`options.${index}.name`}
                                  variant="outlined"
                                  Icon={id ? '' : index >= 2 && ClearIcon}
                                  onIconClick={() =>
                                    handleRemoveField(
                                      values,
                                      remove,
                                      setFieldValue,
                                      index
                                    )
                                  }
                                  appendIcon
                                />
                              </Box>
                            </Box>
                          ))}
                        </Box>
                        <Box ml={3} my={[2, 0]}>
                          <Button
                            startIcon={<AddIcon fontSize="small" />}
                            variant="contained"
                            loading={false}
                            disabled={
                              loading ||
                              id ||
                              values.options.length >= POLL_OPTIONS_LIMIT
                            }
                            color="secondary"
                            type="button"
                            onClick={() => push({ name: '' })}
                          >
                            Add Options
                          </Button>
                        </Box>
                        <Box
                          my={15}
                          display="flex"
                          flexWrap="wrap"
                          justifyContent={['left', 'center']}
                        >
                          <Box ml={2} my={[2, 0]}>
                            <Button
                              variant="contained"
                              disabled={loading || voted.length > 0}
                              color="secondary"
                              type="submit"
                              startIcon={<SaveIcon />}
                            >
                              {id ? 'Update' : 'Create'}
                            </Button>
                          </Box>
                          <Box
                            ml={2}
                            my={[2, 0]}
                            display="flex"
                            justifyContent={['center', 'center', 'left']}
                          >
                            <Button
                              startIcon={<ClearIcon />}
                              onClick={() => navigateTo(history, '/polls')}
                            >
                              Cancel
                            </Button>
                          </Box>
                        </Box>
                      </Box>
                    )}
                  />
                </Box>
              </Box>
            </Form>
          )}
        />
      </WrapInCard>
    </WrapInBreadcrumbs>
  );
};

CreatePollPage.propTypes = {
  initialValues: PropTypes.shape({
    options: PropTypes.array,
    name: PropTypes.string,
    question: PropTypes.string,
    'options-1': PropTypes.string,
    'options-2': PropTypes.string,
    startDate: PropTypes.instanceOf(Date),
    endDate: PropTypes.instanceOf(Date),
    status: PropTypes.string,
  }),
  id: PropTypes.number,
  onHandleSubmit: PropTypes.func,
};

export default CreatePollPage;
