import { DateTimeService } from '@libs/commons/helper/date-time/date-time.service';
import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as moment from 'moment';

const MAX_CHAR_PW_LENGTH = 50;
const MIN_CHAR_PW_LENGTH = 4;

@Injectable()
export class ToolsService {
  constructor(
    private readonly config: ConfigService,
    private readonly dateHelper: DateTimeService,
  ) {}

  dateConv(rawDate: string, timezone: string) {
    let baseDate: string;
    let utcDate: string;
    let convertedDate: string;
    try {
      baseDate = this.dateHelper.makeMomentObject(rawDate);
      utcDate = this.dateHelper.getUTCDateTime(baseDate);
      convertedDate = this.dateHelper.convertToTimeZone(timezone, utcDate);
    } catch (error) {
      if (error.message.includes('Moment Timezone has no data for')) {
        throw new BadRequestException(`can't find timezone: ${timezone}`);
      } else {
        throw new InternalServerErrorException(error);
      }
    }

    return {
      base: baseDate,
      timezone,
      result: convertedDate,
      utc: utcDate,
      misc: {
        os_timezone: this.config.get('TZ'),
        os_datetime: moment(new Date()).format('YYYY-MM-DD HH:mm:ss'),
      },
    };
  }

  mixPassword(
    charLength: number,
    areUpper: boolean,
    areNumbers: boolean,
    areSymbols: boolean,
  ) {
    let charCodes = this.lowerCharCode;

    if (charLength > MAX_CHAR_PW_LENGTH) {
      charLength = MAX_CHAR_PW_LENGTH;
    } else if (charLength < MIN_CHAR_PW_LENGTH) {
      return 'Are you sure about this?';
    }

    if (areUpper) charCodes = charCodes.concat(this.upperCharCode);
    if (areNumbers) charCodes = charCodes.concat(this.numCharCode);
    if (areSymbols) charCodes = charCodes.concat(this.SymbCharCode);

    const passwordCharacters: string[] = [];
    for (let i = 0; i < charLength; i++) {
      const randCharCodes =
        charCodes[Math.floor(Math.random() * charCodes.length)];
      passwordCharacters.push(String.fromCharCode(randCharCodes));
    }

    return { password: passwordCharacters.join('') };
  }

  private get upperCharCode(): number[] {
    return this.arrayFromLowToHigh(97, 122);
  }

  private get lowerCharCode(): number[] {
    return this.arrayFromLowToHigh(65, 90);
  }

  private get numCharCode() {
    return this.arrayFromLowToHigh(48, 57);
  }

  private get SymbCharCode() {
    return this.arrayFromLowToHigh(33, 47)
      .concat(this.arrayFromLowToHigh(58, 64))
      .concat(this.arrayFromLowToHigh(91, 96))
      .concat(this.arrayFromLowToHigh(123, 126));
  }

  private arrayFromLowToHigh(low: number, high: number) {
    const itArr: number[] = [];

    for (let i = low; i <= high; i++) {
      itArr.push(i);
    }

    return itArr;
  }

  getHello(): string {
    return 'Hello World!';
  }
}
