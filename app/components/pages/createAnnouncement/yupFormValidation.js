import { object, mixed, string, date, ref } from 'yup';

export const yupUserFormValidaton = object().shape({
  title: string().required('*Title Required'),
  description: string().required('*Description Required'),
  expiryDate: string().required('*Expiry Date Required'),
  startDate: string().required('*Start Date Required'),
  endDate: string().required('*End Date Required'),
});
