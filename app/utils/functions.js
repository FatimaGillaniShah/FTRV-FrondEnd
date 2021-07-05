import moment from 'moment';

export const parseDate = (date) => moment(date).format('MM/DD/YYYY');
export function noWhitespace() {
  return this.transform((value, originalValue) =>
    /^[ ]*$/.test(originalValue) ? NaN : value
  );
}
