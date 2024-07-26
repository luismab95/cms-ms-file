import * as moment from 'moment';

moment.locale('es');

export function currentDate(format: string) {
  return moment().format(format);
}
