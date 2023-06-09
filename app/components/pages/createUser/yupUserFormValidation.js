import moment from 'moment';
import { object, mixed, string, date, ref, array } from 'yup';
import { MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS } from '../../../utils/constants';
import { parseDate } from '../../../utils/functions';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];
export const yupUserFormValidaton = object().shape({
  file: mixed().when('isProfilePicAttached', {
    is: true,
    then: mixed()
      .test('checkEmptyFile', 'Empty File', (value) => value && value.size)
      .test(
        'fileSize',
        'File too large',
        (value) =>
          value &&
          value.size &&
          value.size / 1024 / 1024 <= MAX_UPLOADABLE_IMAGE_SIZE_IN_MBS
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  }),
  firstName: string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('*First Name Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  lastName: string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('*Last Name Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  locationId: string().required('*Location Required'),
  departmentId: string().required('*Department Required'),
  title: string()
    .min(1, 'Too Short!')
    .max(200, 'Too Long!')
    .required('*Designation Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  email: string()
    .max(320, 'Invalid')
    .email()
    .required('*Email Required')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces'),
  password: string()
    .min(4, 'Too Short')
    .max(15, 'Exceeded Maximum Characters Limit')
    .noWhitespace()
    .typeError('* This field cannot contain only blankspaces')
    .when('passwordRequired', {
      is: true,
      then: string().required('*Password Required'),
    }),
  confirmPassword: string().when('password', {
    is: (password) => password && password.length > 0,
    then: string()
      .required('Required')
      .max(15, 'Exceeded Maximum Characters Limit')
      .oneOf([ref('password'), null], 'Passwords must match'),
  }),
  contactNo: string()
    .min(10, 'Minimum 10 digits are allowed!')
    .max(12, 'Maximum 12 digits are allowed!')
    .nullable()
    .transform((value) => (value ? value.replace(/[^\d]/g, '') : null)),
  extension: string()
    .matches(/^[0-9]*$/, '* Only number are allowed')
    .max(10, 'Too Long!')
    .nullable(),
  joiningDate: date()
    .typeError('Invalid Date Format')
    .max(
      moment().endOf('day'),
      ({ max }) => `Joining must be equal or less to ${parseDate(max)}`
    )
    .notRequired()
    .default(null)
    .nullable(),
  dob: date()
    .typeError('Invalid Date Format')
    .max(
      moment().endOf('day'),
      ({ max }) => `Date of birth must be equal or less to ${parseDate(max)}`
    )
    .notRequired()
    .default(null)
    .nullable(),
  groupIds: array().when('isAdmin', {
    is: (isAdmin) => !isAdmin,
    then: array().required('*Groups Required').min(1),
  }),
});
