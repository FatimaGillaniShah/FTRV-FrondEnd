import React from 'react';
import NotExist from '../noData';

const Show = ({ IF: condition, description, Icon, children }) => {
  if (condition) {
    return children;
  }

  if (description && Icon) {
    return <NotExist Icon={Icon} description={description} />;
  }

  return <></>;
};

export default Show;
