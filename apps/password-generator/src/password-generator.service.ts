import { Injectable } from '@nestjs/common';

@Injectable()
export class PasswordGeneratorService {
  private MAX_CHAR_LENGTH = 50;
  private MIN_CHAR_LENGTH = 4;

  /**
   * max char length: 50
   * min char length: 4
   * include:
   *  - upper
   *  - num
   *  - symbols
   */
  genPass(
    charLength: number,
    areUpper: boolean,
    areNumbers: boolean,
    areSymbols: boolean,
  ) {
    let charCodes = this.lowerCharCode;

    if (charLength > this.MAX_CHAR_LENGTH) {
      charLength = this.MAX_CHAR_LENGTH;
    } else if (charLength < this.MIN_CHAR_LENGTH) {
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

    return passwordCharacters.join('');
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
}
