import { object, string, number } from 'yup';

export const profitCenterSchema = object().shape({
  name: string().required('*Center Name is Required'),
  address: string().required('*Address is Required'),
  centerNo: number()
    .typeError('Only numbers are allowed')
    .required('*Center Number Required'),
  code: string().required('*Code is Required'),
  faxNo: string()
    .min(10, 'Minimum 10 digits are allowed!')
    .max(12, 'Maximum 12 digits are allowed!')
    .nullable()
    .transform((value) => (value ? value.replace(/[^\d]/g, '') : null)),
  contactNo: string()
    .min(10, 'Minimum 10 digits are allowed!')
    .max(12, 'Maximum 12 digits are allowed!')
    .nullable()
    .required('*Contact Number is Required')
    .transform((value) => (value ? value.replace(/[^\d]/g, '') : null)),
  managerId: string().notRequired().nullable(),
});
