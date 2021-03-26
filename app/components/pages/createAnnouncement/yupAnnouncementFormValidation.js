import { object, string } from 'yup';

export const yupAnnouncementFormValidation = object().shape({
  title: string().required('*Title Required'),
  description: string().required('*Description Required'),
  expiryDate: string().required('*Expiry Date Required'),
  startDate: string().required('*Start Date Required'),
  endDate: string().required('*End Date Required'),
});
