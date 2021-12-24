import React, { memo } from 'react';
import PropTypes from 'prop-types';
import { useQuery } from 'react-query';
import { keys } from '../../state/queryKeys';
import { getUserTitles } from '../../state/queryFunctions';
import { Select } from '../index';

function TitleDropDown({ variant, selectedValue, label, ...props }) {
  const { data: titles, isLoading } = useQuery(keys.getitles, getUserTitles);
  const options = titles?.data?.data?.map(({ title }) => ({
    value: title,
    label: title,
  }));
  return (
    <Select
      label={label}
      variant={variant}
      selectedValue={selectedValue}
      options={options}
      loading={isLoading}
      {...props}
    />
  );
}

TitleDropDown.propTypes = {
  selectedValue: PropTypes.string,
  variant: PropTypes.string,
  label: PropTypes.string,
};
TitleDropDown.defaultProps = {
  variant: 'standard',
  label: 'Title',
};

export default memo(TitleDropDown);
