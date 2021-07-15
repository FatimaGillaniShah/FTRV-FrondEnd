import { makeStyles } from '@material-ui/core/styles';

export const useStyles = makeStyles(() => ({
  documentUpload: {
    cursor: 'pointer',
    borderRadius: '4px',
  },
  fileName: {
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
    overflow: 'hidden',
  },
}));
