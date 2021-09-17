import { object, string, date, number } from 'yup';
import { parseDate } from '../../../utils/functions';

const maxDate = parseDate(new Date('2099-12-30'));
export const jobSchema = object().shape({
  title: string().required('*Title Required'),
  departmentId: number().required('*Department Required'),
  locationId: number().required('*Location Required'),
  expiryDate: date()
    .typeError('Invalid Date Format')
    .min(
      parseDate(new Date()),
      ({ min }) => `*Due Date must be equal or greater to ${min}`
    )
    .max(
      maxDate.toLocaleString(),
      ({ max }) => `*Due Date must be equal or less to ${max}`
    )
    .required('*Due Date Required'),
  description: string().required('*Content Required'),
});
