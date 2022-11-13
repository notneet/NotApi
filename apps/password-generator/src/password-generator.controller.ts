import {
  Body,
  Controller,
  ParseBoolPipe,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { PasswordGeneratorService } from './password-generator.service';

@Controller('password')
export class PasswordGeneratorController {
  constructor(
    private readonly passwordGeneratorService: PasswordGeneratorService,
  ) {}

  @Post()
  getHello(
    @Body('character_length', ParseIntPipe) charLength: number,
    @Body('include_upper', ParseBoolPipe) areUpper: boolean,
    @Body('include_numbers', ParseBoolPipe) areNumbers: boolean,
    @Body('include_symbols', ParseBoolPipe) areSymbols: boolean,
  ) {
    return this.passwordGeneratorService.genPass(
      charLength,
      areUpper,
      areNumbers,
      areSymbols,
    );
  }
}
