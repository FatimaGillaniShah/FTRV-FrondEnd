import { object, string, number } from 'yup';

export const profitCenterSchema = object().shape({
  name: string().required('*Name Required'),
  address: string().required('*Address Required'),
  centerNo: number().required('*Number Required'),
  code: string().required('*Code Required'),
  faxNo: string()
    .min(10, 'Minimum 10 digits are allowed!')
    .max(12, 'Maximum 12 digits are allowed!')
    .nullable()
    .transform((value) => (value ? value.replace(/[^\d]/g, '') : null)),
  contactNo: string()
    .min(10, 'Minimum 10 digits are allowed!')
    .max(12, 'Maximum 12 digits are allowed!')
    .nullable()
    .required('*ContactNo Required')
    .transform((value) => (value ? value.replace(/[^\d]/g, '') : null)),
  managerId: string().notRequired().nullable(),
});
