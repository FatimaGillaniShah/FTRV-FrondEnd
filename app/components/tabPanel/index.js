import React from 'react';
import PropTypes from 'prop-types';
import Box from '@material-ui/core/Box';

function TabPanel({ children, value, index, ...props }) {
  return (
    value === index && (
      <Box id={`vertical-tabpanel-${index}`} {...props}>
        <Box>{children}</Box>
      </Box>
    )
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

export default TabPanel;
