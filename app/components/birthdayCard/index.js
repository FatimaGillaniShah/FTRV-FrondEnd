import { Box } from '@material-ui/core';
import React from 'react';
import BoxWithBg from '../boxWithBg';
import BirdthdayCard from './birthdayCard';
import { colors } from '../../theme/colors';
import Show from '../show';
import { Carousel } from '../index';

export function BirthdayCarousel({ items }) {
  return (
    <>
      <Show IF={items?.length >= 1}>
        <Box>
          <BoxWithBg title="Birthdays" bgColor={colors.orange}>
            <Carousel
              autoPlay
              animation="fade"
              navButtonsAlwaysInvisible
              indicators={items?.length !== 1}
            >
              {items?.map((item) => (
                <BirdthdayCard item={item} />
              ))}
            </Carousel>
          </BoxWithBg>
        </Box>
      </Show>
    </>
  );
}

export default BirthdayCarousel;
