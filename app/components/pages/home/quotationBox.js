import React from 'react';
import BoxWithBg from '../../boxWithBg';
import { BodyText } from '../../typography';

export default function QuotationBox({ dailyQuote }) {
  return (
    <BoxWithBg
      title="Daily Dose Of Motivation"
      bgColor="secondary.main"
      textAlignment="center"
    >
      <BodyText color="light" light>
        {dailyQuote}
      </BodyText>
    </BoxWithBg>
  );
}
