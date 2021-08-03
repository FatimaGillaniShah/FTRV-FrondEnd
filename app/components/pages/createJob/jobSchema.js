import { object, string, date } from 'yup';

export const jobSchema = object().shape({
  title: string().required('*Title Required'),
  departmentId: string().required('*Department Required'),
  locationId: string().required('*Location Required'),
  expiryDate: date().required('*Deadline Required'),
  description: string().required('*Content Required'),
});
