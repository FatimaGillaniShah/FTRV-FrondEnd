import React, { useState } from 'react';
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
  Collapse,
  Card,
  CardHeader,
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
import _ from 'lodash';
import { navigateTo } from '../../utils/helper';
import FormikRadioGroup from '../muiRadioButtons';
import { Button, MuiBadge } from '../index';
import { ROLES } from '../../utils/constants';
import { useAuthContext } from '../../context/authContext';
import { BodyTextLarge, H5, BodyTextSmall } from '../typography';
import BorderLinearProgress from '../muiLinearProgress';
import Show from '../show';
import { colors } from '../../theme/colors';

const useStyles = makeStyles(() => ({
  card: {
    '&:hover': {
      boxShadow:
        '0px 5px 5px -3px rgb(0 0 0 / 20%), 0px 8px 10px 1px rgb(0 0 0 / 14%), 0px 3px 14px 2px rgb(0 0 0 / 12%)',
    },
    borderRadius: '0px',
  },
  homeCard: { borderRadius: '0px' },
  cardHeader: {
    paddingTop: '6.5px',
    paddingBottom: '6.5px',
    backgroundColor: colors.secondary,
  },
  userCardHeader: {
    paddingTop: '12px',
    paddingBottom: '12px',
    backgroundColor: colors.secondary,
  },
  menu: {
    color: colors.light,
  },
  textStyle: {
    textTransform: 'capitalize',
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
  votesSum,
}) => {
  const sortedOptions = _.sortBy(options, (option) => option.value);
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
    votes > 0 ? Math.floor((votes / totalVotes) * 100) : 0;
  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={(values) => onHandleVoteSubmit(id, values)}
    >
      {({ errors }) => (
        <Form>
          <Card className={!home ? classes.card : classes.homeCard}>
            <CardHeader
              className={
                role === ROLES.ADMIN
                  ? classes.cardHeader
                  : classes.userCardHeader
              }
              title={<H5 color="light">{name}</H5>}
              action={
                <>
                  {role === ROLES.ADMIN && (
                    <>
                      <Box>
                        <IconButton onClick={handleClick}>
                          <MoreVertIcon className={classes.menu} />
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
                    </>
                  )}
                </>
              }
            ></CardHeader>
            <Box display="flex" flexDirection="row" mt={5} ml={5}>
              <Show IF={home && voted}>
                <Box>
                  <MuiBadge badgeContent="Voted" color={colors.oliveGreen} />
                </Box>
              </Show>
              <Show IF={!home}>
                <Show IF={!pending && !expired}>
                  <Box>
                    <MuiBadge
                      className={classes.textStyle}
                      badgeContent={status}
                      color={statusColor}
                    />
                  </Box>
                </Show>
                <Box ml={[0, 0, 0, 1]}>
                  <Show IF={expired}>
                    <MuiBadge badgeContent="expired" color="error" />
                  </Show>
                  <Show IF={pending}>
                    <MuiBadge badgeContent="pending" color={colors.orange} />
                  </Show>
                </Box>
              </Show>
            </Box>
            <Box p={6}>
              <Box>
                <BodyTextLarge bold> {description}</BodyTextLarge>
              </Box>
              {role === ROLES.ADMIN && (
                <Show IF={votesSum > 0}>
                  <Box display="flex" justifyContent="flex-end" mt={2}>
                    <BodyTextSmall color="grey" bold>
                      {`${votesSum} `}
                      Vote(s)
                    </BodyTextSmall>
                  </Box>
                </Show>
              )}
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
                      options={sortedOptions}
                      fieldError={false}
                    />
                  </Box>
                </Tooltip>
                <Box
                  display="flex"
                  flexDirection={['column', 'column', 'column', 'row']}
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
              <Collapse in={!hidden} collapsedSize={40}>
                {sortedOptions?.map((val) => (
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
              </Collapse>
            </Box>
          </Card>
        </Form>
      )}
    </Formik>
  );
};

Poll.propTypes = {
  name: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
};
