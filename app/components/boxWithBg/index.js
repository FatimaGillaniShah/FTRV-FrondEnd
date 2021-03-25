import { Box } from '@material-ui/core';
import React from 'react';
import { H5 } from '../typography';

export default function BoxWithBg({
  showTitle = true,
  title,
  titleColor = 'dark',
  titleWeight = { bold: 'bold' },
  bgColor,
  textAlignment = 'null',
  children,
}) {
  return (
    <Box>
      {showTitle && (
        <Box my={4} ml={2}>
          <H5 color={titleColor} {...titleWeight}>
            {title}
          </H5>
        </Box>
      )}
      <Box
        bgcolor={bgColor}
        textAlign={textAlignment}
        borderRadius="5px"
        m={1}
        p={3}
      >
        {children}
      </Box>
    </Box>
  );
}
