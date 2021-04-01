import { object, string, date, ref } from 'yup';

export const yupAnnouncementFormValidation = object().shape({
  title: string().required('*Title Required'),
  description: string().required('*Description Required'),
  startTime: date().required('*Start Date  Required'),
  endTime: date()
    .required('*End Date  Required')
    .min(ref('startTime'), 'End date must be grater than start date'),

  priority: string().required('*Priority Required'),
});
