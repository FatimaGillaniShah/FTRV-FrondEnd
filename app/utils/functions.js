import moment from 'moment';

export const parseDate = (date) => moment(date).format('MM/DD/YYYY');
export function noWhitespace() {
  return this.transform((value, originalValue) =>
    /^[ ]*$/.test(originalValue) ? NaN : value
  );
}

export const createFormData = (object) =>
  Object.keys(object).reduce((formData, key) => {
    if (object[key]) formData.append(key, object[key]);
    return formData;
  }, new FormData());

export const getChangedValues = (values, initialValues) =>
  Object.entries(values).reduce((acc, [key, value]) => {
    const hasChanged = initialValues[key] !== value;

    if (hasChanged) {
      acc[key] = value;
    }

    return acc;
  }, {});
