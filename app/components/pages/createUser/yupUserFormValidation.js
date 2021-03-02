import { object, mixed, string, date } from 'yup';

const FILE_SIZE = 10;
const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const yupUserFormValidaton = object().shape({
  file: mixed().when('isProfilePicAttached', {
    is: true,
    then: mixed()
      .test('checkEmptyFile', 'Empty File', (value) => value && value.size)
      .test(
        'fileSize',
        'File too large',
        (value) => value && value.size && value.size / 1024 / 1024 <= FILE_SIZE
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  }),
  firstName: string()
    .min(4, 'Too Short!')
    .max(40, 'Too Long!')
    .matches(
      /^[a-zA-Z ]*$/,
      'First Name can only include alphabets and white spaces'
    )
    .required('*First Name Required'),
  lastName: string()
    .min(4, 'Too Short!')
    .max(40, 'Too Long!')
    .matches(
      /^[a-zA-Z ]*$/,
      'Last Name can only include alphabets and white spaces'
    )
    .required('*Last Name Required'),
  location: string()
    .min(2, 'Too Short!')
    .max(70, 'Too Long!')
    .matches(
      /^[#,-/ a-zA-Z0-9]*$/,
      'Location can only include alphabets, numerics,whitespaces and [#,-./]'
    )
    .required('*Location Required'),
  department: string()
    .min(1, 'Too Short!')
    .max(30, 'Too Long!')
    .matches(
      /^[a-zA-Z ]*$/,
      'Department can only include alphabets and white spaces'
    )
    .required('*Department Required'),
  title: string()
    .max(30, 'Too Long!')
    .matches(
      /^[a-zA-Z ]*$/,
      'Designation can only include alphabets and white spaces'
    )
    .required('*Designation Required'),
  email: string().max(320, 'Invalid').email().required('*Email Required'),

  contactNo: string()
    .test(
      'contactNoTest',
      'Should have 10 numerics in phone ',
      (value) => value && value.replace(/[{()}]| |-|_/g, '').length === 10
    )
    .required('*Contact No Required'),
  extension: string()
    .max(5, 'Too Long!')
    .matches(/^[0-9]*$/, 'Extension can only contains numerics')
    .required('*Phone Extension Required'),
  joiningDate: date().required('* Date of Joining Required'),
});
