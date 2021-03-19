import { Box } from '@material-ui/core';
import React from 'react';
import { H6 } from '../typography';

export default function BoxWithBg({
  showTitle = true,
  title,
  titleColor = 'darkShade',
  titleWeight = { bold: 'bold' },
  bgColor,
  textAlignment = 'null',
  children,
}) {
  return (
    <Box>
      {showTitle && (
        <Box my={4} ml={2}>
          <H6 color={titleColor} {...titleWeight}>
            {title}
          </H6>
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
