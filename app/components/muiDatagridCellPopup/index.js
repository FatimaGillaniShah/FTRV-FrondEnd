import React, { useEffect, useRef, useState } from 'react';
import { isOverflown } from '@material-ui/data-grid';
import { Box, Paper, Popper } from '@material-ui/core';

import { useStyles } from './style';
import { BodyTextSmall } from '../index';
import Show from '../show';

export default function RenderCellExpand({
  colDef: { width },
  formattedValue,
}) {
  const value = formattedValue ? formattedValue.toString() : '';
  const wrapper = useRef(null);
  const cellDiv = useRef(null);
  const cellValue = useRef(null);
  const [anchorEl, setAnchorEl] = useState(null);
  const classes = useStyles({ width, wrapper });
  const [showFullCell, setShowFullCell] = useState(false);
  const [showPopper, setShowPopper] = useState(false);

  const handleMouseEnter = () => {
    const isCurrentlyOverflown = isOverflown(cellValue.current);
    setShowPopper(isCurrentlyOverflown);
    setAnchorEl(cellDiv.current);
    setShowFullCell(true);
  };

  const handleMouseLeave = () => {
    setShowFullCell(false);
  };

  useEffect(() => {
    if (!showFullCell) {
      return undefined;
    }

    function handleKeyDown(nativeEvent) {
      // IE11, Edge (prior to using Bink?) use 'Esc'
      if (nativeEvent.key === 'Escape' || nativeEvent.key === 'Esc') {
        setShowFullCell(false);
      }
    }

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [setShowFullCell, showFullCell]);

  return (
    <Box
      ref={wrapper}
      className={classes.root}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <Box ref={cellDiv} className={classes.popperBoxStyle} />
      <Box ref={cellValue} className="cellValue">
        {value}
      </Box>
      <Show IF={showPopper}>
        <Popper
          open={showFullCell && anchorEl !== null}
          anchorEl={anchorEl}
          className={classes.popperStyle}
        >
          <Paper elevation={1} className={classes.paperStyle}>
            <BodyTextSmall className={classes.textPadding}>
              {value}
            </BodyTextSmall>
          </Paper>
        </Popper>
      </Show>
    </Box>
  );
}
