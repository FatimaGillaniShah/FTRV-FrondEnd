import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { colors } from '../../theme/colors';

const MuiBadge = withStyles(() => ({
  badge: {
    position: 'relative',
    backgroundColor: (props) => props.color,
    color: colors.light,
  },
}))((props) => (
  <Badge
    anchorOrigin={{
      vertical: 'top',
      horizontal: 'center',
    }}
    {...props}
  />
));

export default MuiBadge;
