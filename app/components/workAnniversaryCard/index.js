import { Box } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import BoxWithBg from '../boxWithBg';
import WorkAnniversaryCard from './workAnniversaryCard';
import { colors } from '../../theme/colors';

export function WorkAnniversaryCarousel({ items }) {
  return (
    <>
      {items?.length >= 1 && (
        <Box>
          <BoxWithBg title="Work Anniversary" bgColor={colors.secondary}>
            <Carousel
              autoPlay
              animation="fade"
              navButtonsAlwaysInvisible
              indicators={items?.length !== 1}
            >
              {items?.map((item) => (
                <WorkAnniversaryCard item={item} />
              ))}
            </Carousel>
          </BoxWithBg>
        </Box>
      )}
    </>
  );
}

export default WorkAnniversaryCarousel;
