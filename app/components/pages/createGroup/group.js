import { Box, useMediaQuery } from '@material-ui/core';
import React, { memo } from 'react';
import SaveIcon from '@material-ui/icons/Save';
import { Form, Formik } from 'formik';
import { string, object } from 'yup';
import { useTheme, makeStyles } from '@material-ui/styles';
import ClearIcon from '@material-ui/icons/Clear';
import GroupAddOutlinedIcon from '@material-ui/icons/GroupAddOutlined';
import { useHistory } from 'react-router-dom';
import DescriptionOutlinedIcon from '@material-ui/icons/DescriptionOutlined';
import { Alert } from '@material-ui/lab';
import DataTable from '../../dataTable';
import { getHeadCells } from './columns';
import { Input, Button } from '../../index';
import { navigateTo } from '../../../utils/helper';
import { Search } from './search';

const groupsSchema = object().shape({
  groupName: string()
    .noWhitespace()
    .required('Name Required')
    .typeError('* This field cannot contain only blankspaces'),
});

const useStyles = makeStyles(() => ({
  alertPadding: {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
  },
}));

export function Group({
  id,
  data,
  onHandleSubmit,
  initialValues,
  loading,
  groupPage,
  setGroupPage,
  defaultResources,
  resource,
  onHandleSearch,
  onHandleChange,
  onHandleHeaderChange,
}) {
  const history = useHistory();
  const classes = useStyles();
  const theme = useTheme();
  const match = useMediaQuery(theme.breakpoints.down('lg'));
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={groupsSchema}
      onSubmit={onHandleSubmit}
    >
      {() => (
        <Form>
          <Box display="flex">
            <Box width={1 / 3} my={5} mr={30}>
              <Input
                variant="standard"
                placeholderText="Enter Group name*"
                name="groupName"
                appendIcon
                Icon={GroupAddOutlinedIcon}
                IconClickable
              />
            </Box>
            <Box width={1 / 3} my={5}>
              <Input
                variant="standard"
                placeholderText="Enter Description "
                name="description"
                appendIcon
                Icon={DescriptionOutlinedIcon}
                IconClickable
              />
            </Box>
          </Box>
          <Box mt={5} mb={5}>
            <Search
              initialValues={{ query: '' }}
              onHandleSearch={onHandleSearch}
            />
          </Box>

          <Box mt={5}>
            <Box mb={3}>
              <Alert severity="info" className={classes.alertPadding}>
                <strong>{resource?.length}</strong> Resource(s) Selected
              </Alert>
            </Box>
            <DataTable
              rows={data}
              columns={getHeadCells({
                onHandleChange,
                match,
                resource,
                defaultResources,
                onHandleHeaderChange,
                data,
              })}
              page={groupPage}
              setPage={setGroupPage}
            />
          </Box>
          <Box display="flex" mt={5}>
            <Box mb={5}>
              <Button
                type="submit"
                color="secondary"
                variant="contained"
                disabled={loading}
                startIcon={<SaveIcon />}
              >
                {id ? 'Update' : 'Create'}
              </Button>
            </Box>
            <Box ml={2}>
              <Button
                variant="text"
                startIcon={<ClearIcon />}
                onClick={() => {
                  navigateTo(history, `/groups`);
                }}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Form>
      )}
    </Formik>
  );
}

export default memo(Group);
