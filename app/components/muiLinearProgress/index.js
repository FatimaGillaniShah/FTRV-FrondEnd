import { makeStyles } from '@material-ui/core/styles';
import LinearProgress from '@material-ui/core/LinearProgress';
import React from 'react';
import { Box } from '@material-ui/core';
import { useTheme } from '@material-ui/styles';

const BorderLinearProgress = ({ value, color, variant, animation }) => {
  const theme = useTheme();
  const votePercentageColor =
    value === 0 ? theme.palette.text.dark : theme.palette.text.light;
  const useStyles = makeStyles({
    root: {
      height: 15,
      borderRadius: 5,
    },
    colorPrimary: {
      backgroundColor:
        theme.palette.grey[theme.palette.type === 'light' ? 200 : 700],
    },
    bar: {
      borderRadius: 5,
      backgroundColor: color?.main,
      width: `${value}%`,
    },
    progressLabel: {
      position: 'relative',
      top: '11px',
      zIndex: 1,
      textAlign: 'end',
      display: 'flex',
      '& span': {
        color: votePercentageColor,
        width: `${value - 3}%`,
      },
    },
  });

  const classes = useStyles();
  return (
    <Box lineHeight={0.5}>
      <Box className={classes.progressLabel}>
        <span>{`${value}%`}</span>
      </Box>
      <LinearProgress
        variant={variant}
        value={value}
        classes={{
          root: classes.root,
          colorPrimary: classes.colorPrimary,
          bar: classes.bar,
          bar1Indeterminate: animation?.bar1Indeterminate,
          bar2Indeterminate: animation?.bar2Indeterminate,
        }}
      />
    </Box>
  );
};
export default BorderLinearProgress;
