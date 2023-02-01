import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class RequestPWGenDto {
  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  character_length: number;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  include_upper: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  include_number: boolean;

  @IsBoolean()
  @IsNotEmpty()
  @ApiProperty()
  include_symbol: boolean;
}
