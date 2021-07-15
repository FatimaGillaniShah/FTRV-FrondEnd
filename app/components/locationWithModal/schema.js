import { string, object } from 'yup';

export const locationSchema = object().shape({
  name: string()
    .required('*Location Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
});
