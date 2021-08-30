import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
import PropTypes from 'prop-types';
import {
  Box,
  IconButton,
  MenuItem,
  Menu,
  ListItemIcon,
  FormHelperText,
} from '@material-ui/core';
import { useHistory } from 'react-router-dom';
import Alert from '@material-ui/lab/Alert';
import Fade from '@material-ui/core/Fade';
import { string, object } from 'yup';
import { useTheme } from '@material-ui/styles';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik, Field } from 'formik';
import Show from '../show';
import { navigateTo } from '../../utils/helper';
import FormikRadioGroup from '../muiRadioButtons';
import { MuiBadge } from '../index';
import { ROLES } from '../../utils/constants';
import { useAuthContext } from '../../context/authContext';
import { BodyTextLarge, H5 } from '../typography';
import BorderLinearProgress from '../muiLinearProgress';
import { colors } from '../../theme/colors';

const useStyles = makeStyles(() => ({
  card: {
    '&:hover': {
      marginTop: '-12px',
      marginLeft: '-12px',
      transition: 'all 0.4s',
      boxShadow:
        '-1px 5px 5px -2px rgb(0 0 0 / 20%), 0px 1px 2px 0px rgb(0 0 0 / 14%), 0px 1px 4px 0px rgb(0 0 0 / 12%)',
    },
  },
  bar1Indeterminate: {
    width: 'auto',
    animation: '$indeterminate1 1s linear forwards',
  },
  bar2Indeterminate: {
    display: 'none',
  },
  '@keyframes indeterminate1': {
    '0%': {
      left: '-35%',
      right: '100%',
    },
    '100%': {
      left: '0%',
      right: '0%',
    },
  },
}));

export const Poll = ({
  options,
  name,
  description,
  id,
  onHandleDelete,
  home,
  status,
  expired,
  pending,
  initialValues,
}) => {
  let voted = [];
  voted = options.filter((option) => option.votes > 0);
  const validationSchema = object().shape({
    pollsOption: string().required('*Please choose option!'),
  });
  const {
    user: {
      data: { role },
    },
  } = useAuthContext();
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    event.preventDefault();
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const history = useHistory();
  const theme = useTheme();
  const colorArray = ['success', 'error', 'warning', 'info'];
  const [hidden, setHidden] = useState(false);
  const classes = useStyles();
  const statusColor =
    status === 'active' ? colors.oliveGreen : colors.lightGrey;
  const votePercentage = (votes, totalVotes) =>
    votes > 0 ? (votes / totalVotes) * 100 : 0;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onsubmit}
    >
      {({ errors }) => (
        <Form>
          <Box p={1}>
            <Paper className={classes.card} elevation={home ? 2 : 8}>
              <Box p={10}>
                <Box
                  display="flex"
                  flexDirection={['column', 'column', 'column', 'row']}
                  width={1}
                  justifyContent="space-between"
                >
                  <Box mb={7} mt={2} width={[1, 1, 1, '40%']}>
                    <H5>{name}</H5>
                  </Box>

                  {role === ROLES.ADMIN && (
                    <Box
                      display="flex"
                      flexDirection={['column', 'column', 'column', 'row']}
                      width={[1, 1, 1, '80%']}
                      justifyContent="flex-end"
                    >
                      <Show IF={!home}>
                        <Box mt={3}>
                          <MuiBadge badgeContent={status} color={statusColor} />
                        </Box>
                        <Box mt={3} ml={[0, 0, 0, 1]}>
                          <Show IF={expired}>
                            <MuiBadge badgeContent="expired" color="error" />
                          </Show>
                          <Show IF={pending}>
                            <MuiBadge
                              badgeContent="pending"
                              color={colors.orange}
                            />
                          </Show>
                        </Box>
                      </Show>
                      <Box>
                        <IconButton onClick={handleClick}>
                          <MoreVertIcon color="secondary" />
                        </IconButton>
                      </Box>
                      <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={anchorEl}
                        onClose={handleClose}
                        getContentAnchorEl={null}
                        anchorOrigin={{
                          vertical: 'bottom',
                          horizontal: 'left',
                        }}
                      >
                        <Show IF={!pending && !expired && !voted.length > 0}>
                          <MenuItem
                            onClick={() =>
                              navigateTo(history, `/polls/edit/${id}`)
                            }
                          >
                            <ListItemIcon>
                              <EditIcon color="secondary" />
                            </ListItemIcon>
                            Edit
                          </MenuItem>
                        </Show>
                        <MenuItem
                          onClick={() => {
                            handleClose();
                            onHandleDelete(id);
                          }}
                        >
                          <ListItemIcon>
                            <DeleteIcon color="error" />
                          </ListItemIcon>
                          Delete
                        </MenuItem>
                      </Menu>
                    </Box>
                  )}
                </Box>

                <Box>
                  <BodyTextLarge bold> {description}</BodyTextLarge>
                </Box>
                <Show IF={errors.pollsOption}>
                  <Fade in={errors.pollsOption}>
                    <Box mt={3}>
                      <Alert severity="error">
                        <FormHelperText error>
                          {errors.pollsOption}
                        </FormHelperText>
                      </Alert>
                    </Box>
                  </Fade>
                </Show>
                <Field
                  name="pollsOption"
                  component={FormikRadioGroup}
                  options={options}
                  fieldError={false}
                />
                <Box
                  display="flex"
                  flexDirection={['column', 'column', 'column', 'row']}
                >
                  <Box mr={4} my={3}>
                    <Button variant="contained" color="secondary" type="submit">
                      Vote
                    </Button>
                  </Box>
                  <Box my={3}>
                    <Button
                      variant="contained"
                      onClick={() => setHidden(!hidden)}
                    >
                      {hidden ? 'Show Results' : 'Hide Results'}
                    </Button>
                  </Box>
                </Box>

                <Show IF={!hidden}>
                  {options?.map((val, index) => (
                    <Box my={3}>
                      {val.label}
                      <BorderLinearProgress
                        variant="indeterminate"
                        votes={val.vote}
                        value={votePercentage(val.votes, val.totalVotes)}
                        color={theme.palette[colorArray[index]]}
                        animation={{
                          bar1Indeterminate: classes.bar1Indeterminate,
                          bar2Indeterminate: classes.bar2Indeterminate,
                        }}
                      />
                    </Box>
                  ))}
                </Show>
              </Box>
            </Paper>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

Poll.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
