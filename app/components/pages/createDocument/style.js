import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  documentUpload: {
    cursor: 'pointer !important',
  },
  fileName: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));
