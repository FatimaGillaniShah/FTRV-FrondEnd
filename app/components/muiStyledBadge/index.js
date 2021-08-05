import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Badge from '@material-ui/core/Badge';
import { colors } from '../../theme/colors';

const styles = () => ({
  customBadge: {
    width: '3.7rem',
    backgroundColor: (props) => props.color,
    color: colors.light,
  },
});
const SimpleBadge = (props) => {
  const { classes } = props;
  return (
    <Badge
      classes={{ badge: classes.customBadge }}
      badgeContent={props.badgeContent}
    ></Badge>
  );
};
const MuiStyledBadge = withStyles(styles)(SimpleBadge);

export default MuiStyledBadge;
