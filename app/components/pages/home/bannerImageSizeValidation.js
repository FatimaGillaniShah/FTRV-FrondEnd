import { object, mixed } from 'yup';
import { MIN_UPLOADABLE_IMAGE_SIZE_IN_MBS } from '../../../utils/constants';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const bannerImageSizeValidation = object().shape({
  file: mixed().when('isProfilePicAttached', {
    is: true,
    then: mixed()
      .test('checkEmptyFile', 'Empty File', (value) => value && value.size)
      .test(
        'fileSize',
        'File size too small',
        (value) =>
          value &&
          value.size &&
          value.size / 1024 / 1024 > MIN_UPLOADABLE_IMAGE_SIZE_IN_MBS
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        (value) => value && SUPPORTED_FORMATS.includes(value.type)
      ),
  }),
});
