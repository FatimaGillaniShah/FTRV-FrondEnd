import { Box, Button } from '@material-ui/core';
import React, { memo } from 'react';
import { makeStyles } from '@material-ui/styles';
import PropTypes from 'prop-types';
import Carousel from 'react-material-ui-carousel';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';
import NavigateBeforeIcon from '@material-ui/icons/NavigateBefore';
import clsx from 'clsx';
import { colors } from '../../theme/colors';

const useStyles = makeStyles((theme) => ({
  carousel: {
    overflow: 'visible !important',
    '& :hover': {
      '& $button': {
        backgroundColor: 'none !important',
        filter: 'brightness(100%) !important',
        opacity: '1 !important',
      },
    },
  },
  prevClass: {
    textAlign: 'end',
  },
  nextClass: {
    textAlign: 'left',
  },

  buttonClr: {
    '& $button:hover': {
      backgroundColor: `${theme.palette.secondary.light}!important`,
    },
  },
}));

function MuiCarousel({
  children,
  indicators,
  navButtonsAlwaysVisible,
  navButtonsAlwaysInvisible,
  autoPlay,
  ...props
}) {
  const classes = useStyles();
  const navButtonsProps = {
    borderRadius: '20px',
    backgroundColor: colors.secondary,
  };
  const navButtonsWrapperProps = {
    bottom: '0',
    top: 'unset',
    height: '3px',
    width: '50%',
  };
  return (
    <>
      <Carousel
        fullHeightHover={false} // We want the nav buttons wrapper to only be as big as the button element is
        navButtonsWrapperProps={{
          style: navButtonsWrapperProps,
        }}
        navButtonsProps={{
          style: navButtonsProps,
        }}
        className={classes.carousel}
        NavButton={({ onClick, className, style, next, prev }) => (
          <Box
            className={clsx(
              {
                [classes.prevClass]: prev,
                [classes.nextClass]: next,
              },
              classes.buttonClr
            )}
          >
            <Button onClick={onClick} className={className} style={style}>
              {next && <NavigateNextIcon />}
              {prev && <NavigateBeforeIcon />}
            </Button>
          </Box>
        )}
        autoPlay={autoPlay}
        animation="fade"
        navButtonsAlwaysVisible={navButtonsAlwaysVisible}
        navButtonsAlwaysInvisible={navButtonsAlwaysInvisible}
        indicators={indicators}
        {...props}
      >
        {children}
      </Carousel>
    </>
  );
}

MuiCarousel.propTypes = {
  children: PropTypes.element,
  indicators: PropTypes.bool,
  autoPlay: PropTypes.bool,
  navButtonsAlwaysVisible: PropTypes.bool,
  navButtonsAlwaysInvisible: PropTypes.bool,
};

MuiCarousel.defaultProps = {
  autoPlay: false,
  navButtonsAlwaysVisible: true,
  navButtonsAlwaysInvisible: false,
  indicators: false,
};

export default memo(MuiCarousel);

// This component is used to implement carousel
