import { Tooltip } from '@material-ui/core';
import React, { memo } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';

const useStyles = makeStyles(() => ({
  toolTip: {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  },
}));

function ToolTip({ title }) {
  const classes = useStyles();
  return (
    <>
      <Tooltip className={classes.toolTip} title={title}>
        <span>{title}</span>
      </Tooltip>
    </>
  );
}

Tooltip.propTypes = {
  title: PropTypes.string.isRequired,
};

export default memo(ToolTip);
