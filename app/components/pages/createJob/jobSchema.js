import { object, string, date, number } from 'yup';

export const jobSchema = object().shape({
  title: string().required('*Title Required'),
  departmentId: number().required('*Department Required'),
  locationId: number().required('*Location Required'),
  expiryDate: date().required('*Deadline Required'),
  description: string().required('*Content Required'),
});
