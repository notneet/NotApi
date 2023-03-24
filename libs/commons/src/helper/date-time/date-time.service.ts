import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class DateTimeService {
  private readonly mysqlDateFormat = 'YYYY-MM-DD HH:mm:ss';

  makeMomentObject(date: string): string {
    return moment(date).format(this.mysqlDateFormat);
  }

  convertToTimeZone(timeZone: string, date: string): string {
    return moment(date).utc(true).tz(timeZone).format(this.mysqlDateFormat);
  }

  convertUnixTimestampToDatetimeString(unixTimestamp: number): string {
    const momentObj = moment.unix(unixTimestamp).utc();
    const datetimeString = momentObj.format(this.mysqlDateFormat);
    return datetimeString;
  }

  convertDatetimeStringToUnixTimestamp(datetimeString: string): number {
    const momentObj = moment.utc(datetimeString, this.mysqlDateFormat);
    const unixTimestamp = momentObj.unix();
    return unixTimestamp;
  }

  convertToUTC(date: string) {
    const dateMoment = moment(date, this.mysqlDateFormat);
    return dateMoment.utcOffset(0).format(this.mysqlDateFormat);
  }
}
