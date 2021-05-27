import { object, mixed } from 'yup';

const SUPPORTED_FORMATS = ['image/jpg', 'image/jpeg', 'image/png'];

export const bannerImageSizeValidation = object().shape({
  file: mixed().when('isProfilePicAttached', {
    is: true,
    then: mixed()
      .test(
        'checkEmptyFile',
        'Empty File',
        (value) => value && value?.file?.size
      )
      .test(
        'fileSize',
        'File size too small',
        (value) => value?.height >= 200 && value?.width >= 900
      )
      .test(
        'fileFormat',
        'Unsupported Format',
        (value) => value && SUPPORTED_FORMATS.includes(value?.file?.type)
      ),
  }),
});
