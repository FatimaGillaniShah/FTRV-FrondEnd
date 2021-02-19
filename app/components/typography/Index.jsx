import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles((theme) => ({
  root: {
    fontWeight: (props) => `${props.fontWeight} !important`,
    fontSize: (props) =>
      `${theme.typography.pxToRem(`${props.fontSize}`)} !important`,
    textTransform: (props) => `${props.textTransform} !important`,
    color: (props) =>
      `${props.color && theme.palette.text[props.color]} !important`,
  },
}));

export const H1 = (props) => {
  const { root } = useStyles(props);

  return (
    <Typography classes={{ root }} variant="h1">
      {props.children}
    </Typography>
  );
};

export const H2 = (props) => {
  const { root } = useStyles(props);

  return (
    <Typography classes={{ root }} variant="h2">
      {props.children}
    </Typography>
  );
};

export const H3 = (props) => {
  const { root } = useStyles(props);

  return (
    <Typography classes={{ root }} variant="h3">
      {props.children}
    </Typography>
  );
};

export const H4 = (props) => {
  const { root } = useStyles(props);

  return (
    <Typography classes={{ root }} variant="h4">
      {props.children}
    </Typography>
  );
};

export const H5 = (props) => {
  const { root } = useStyles(props);

  return (
    <Typography classes={{ root }} variant="h5">
      {props.children}
    </Typography>
  );
};
export const H6 = (props) => {
  const { root } = useStyles(props);

  return (
    <Typography classes={{ root }} variant="h6">
      {props.children}
    </Typography>
  );
};

export const Body = (props) => {
  const { root } = useStyles(props);

  return (
    <Typography classes={{ root }} variant="body1">
      {props.children}
    </Typography>
  );
};

export const Body2 = (props) => {
  const { root } = useStyles(props);

  return (
    <Typography classes={{ root }} variant="body2">
      {props.children}
    </Typography>
  );
};
