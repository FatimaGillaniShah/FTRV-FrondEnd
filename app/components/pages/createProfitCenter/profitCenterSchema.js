import { object, string, number } from 'yup';

export const profitCenterSchema = object().shape({
  locationName: string().required('*Name Required'),
  locationId: number().required('*Address Required'),
  profitCenterNumber: number().required('*Number Required'),
  profitCenterName: string().required('*Name Required'),
  faxNumber: number().notRequired(),
  phoneNumber: number().required('*Phone Number Required'),
  generalManagerName: string().required('*Name Required'),
});
