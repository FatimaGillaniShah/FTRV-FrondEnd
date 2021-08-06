import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { colors } from '../../theme/colors';

const MuiBadge = withStyles(() => ({
  badge: {
    width: '3.7rem',
    backgroundColor: (props) => props.color,
    color: colors.light,
  },
}))((props) => <Badge {...props} />);

export default MuiBadge;
