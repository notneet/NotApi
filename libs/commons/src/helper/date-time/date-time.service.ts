import { Injectable } from '@nestjs/common';
import * as moment from 'moment-timezone';

@Injectable()
export class DateTimeService {
  private readonly mysqlDateFormat = 'YYYY-MM-DD HH:mm:ss';

  makeMomentObject(date: string): string {
    return moment(date).format(this.mysqlDateFormat);
  }

  getDatetimeByTimeZone(timeZone: string, date: Date): string {
    return moment(date).utc(true).tz(timeZone).format(this.mysqlDateFormat);
  }

  convertToTimeZone(timeZone: string, date: string): string {
    return moment(date).utc(true).tz(timeZone).format(this.mysqlDateFormat);
  }

  convertBetweenTimeZones(toTimeZone: string, date: string): string {
    const utc = this.convertToUTC(date);
    return this.convertToTimeZone(toTimeZone, utc);
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

  convertToUTC(date: string): string {
    const dateMoment = moment(date, this.mysqlDateFormat);
    return moment.utc(dateMoment).format();
  }

  getUTCDateTime(date: string): string {
    return moment(date).utc().format(this.mysqlDateFormat);
  }
}
