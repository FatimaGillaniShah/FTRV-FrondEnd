/**
 *
 * BodyContent
 *
 */

import React, { memo } from 'react';

function bodyContent({ Children }) {
  return (
    <>
      <Children />
    </>
  );
}

export default memo(bodyContent);
