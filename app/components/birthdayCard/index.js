import { Box } from '@material-ui/core';
import React from 'react';
import Carousel from 'react-material-ui-carousel';
import BoxWithBg from '../boxWithBg';
import BirdthdayCard from './birthdayCard';
import { items } from './carouselItems';

export function BirthdayCarousel() {
  return (
    <>
      <Box>
        <BoxWithBg title="Birthdays" bgColor="bgColor.orange">
          <Carousel
            autoPlay
            animation="fade"
            navButtonsAlwaysInvisible
            indicators={items.length !== 1}
          >
            {items.map((item) => (
              <BirdthdayCard item={item} />
            ))}
          </Carousel>
        </BoxWithBg>
      </Box>
    </>
  );
}

export default BirthdayCarousel;
