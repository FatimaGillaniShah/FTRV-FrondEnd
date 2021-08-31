import React, { useState } from 'react';
import Paper from '@material-ui/core/Paper';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import EditIcon from '@material-ui/icons/Edit';
import DeleteIcon from '@material-ui/icons/Delete';
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
import VisibilityOffIcon from '@material-ui/icons/VisibilityOff';
import { makeStyles } from '@material-ui/core/styles';
import { Form, Formik, Field } from 'formik';
import HowToVoteIcon from '@material-ui/icons/HowToVote';
import VisibilityIcon from '@material-ui/icons/Visibility';
import Tooltip from '@material-ui/core/Tooltip';
import { navigateTo } from '../../utils/helper';
import FormikRadioGroup from '../muiRadioButtons';
import { Button, MuiBadge } from '../index';
import { ROLES } from '../../utils/constants';
import { useAuthContext } from '../../context/authContext';
import { BodyTextLarge, H5 } from '../typography';
import BorderLinearProgress from '../muiLinearProgress';
import Show from '../show';
import { colors } from '../../theme/colors';

const useStyles = makeStyles(() => ({
  card: {
    '&:hover': {
      boxShadow:
        '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
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
  onHandleVoteSubmit,
  isVoteLoading,
  voted,
}) => {
  const voteCount = options.filter((option) => option.votes > 0);
  const validationSchema = object().shape({
    pollOption: string().required('*Please select an option!'),
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
      onSubmit={(values) => onHandleVoteSubmit(id, values)}
    >
      {({ errors }) => (
        <Form>
          <Box p={1}>
            <Paper className={!home && classes.card}>
              <Box p={10}>
                <Box
                  display="flex"
                  flexDirection={['row']}
                  width={1}
                  justifyContent="space-between"
                >
                  <Box mt={2} width={1}>
                    <H5>{name}</H5>
                  </Box>

                  {role === ROLES.ADMIN && (
                    <Box
                      display="flex"
                      flexDirection={['column', 'column', 'column', 'row']}
                      width={[1, 1, 1, '80%']}
                      justifyContent="flex-end"
                    >
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
                        <Show IF={!voteCount.length > 0}>
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
                <Box display="flex" flexDirection="row" mb={6}>
                  <Show IF={home && voted}>
                    <Box>
                      <MuiBadge
                        badgeContent="voted"
                        color={colors.oliveGreen}
                      />
                    </Box>
                  </Show>
                  <Show IF={!home}>
                    <Box>
                      <MuiBadge badgeContent={status} color={statusColor} />
                    </Box>
                    <Box ml={[0, 0, 0, 1]}>
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
                </Box>

                <Box>
                  <BodyTextLarge bold> {description}</BodyTextLarge>
                </Box>
                <Show IF={errors?.pollOption}>
                  <Fade in={errors?.pollOption}>
                    <Box mt={3}>
                      <Alert severity="error">
                        <FormHelperText error>
                          {errors?.pollOption}
                        </FormHelperText>
                      </Alert>
                    </Box>
                  </Fade>
                </Show>
                <Show IF={home}>
                  <Tooltip
                    title={
                      voted
                        ? 'You have already voted for this poll'
                        : 'Please select an option'
                    }
                  >
                    <Box>
                      <Field
                        name="pollOption"
                        component={FormikRadioGroup}
                        disabled={isVoteLoading || voted}
                        options={options}
                        fieldError={false}
                      />
                    </Box>
                  </Tooltip>
                  <Box
                    display="flex"
                    flexDirection={['column', 'column', 'column', 'row']}
                  >
                    <Tooltip
                      title={
                        voted ? 'You have already voted for this poll' : 'Vote'
                      }
                    >
                      <Box mr={4} my={3}>
                        <Button
                          variant="contained"
                          color="secondary"
                          type="submit"
                          disabled={isVoteLoading || voted}
                          loading={!voted}
                          startIcon={<HowToVoteIcon />}
                        >
                          {voted ? 'Voted' : 'Vote'}
                        </Button>
                      </Box>
                    </Tooltip>
                    <Tooltip title={hidden ? 'Show Results' : 'Hide Results'}>
                      <Box my={3}>
                        <Button
                          variant="contained"
                          onClick={() => setHidden(!hidden)}
                          startIcon={
                            hidden ? <VisibilityIcon /> : <VisibilityOffIcon />
                          }
                        >
                          {hidden ? 'Show Results' : 'Hide Results'}
                        </Button>
                      </Box>
                    </Tooltip>
                  </Box>
                </Show>

                <Show IF={!hidden}>
                  {options?.map((val) => (
                    <Box my={3}>
                      {val.label}
                      <BorderLinearProgress
                        variant="indeterminate"
                        votes={val.vote}
                        value={votePercentage(val.votes, val.totalVotes)}
                        color={theme.palette.secondary}
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
