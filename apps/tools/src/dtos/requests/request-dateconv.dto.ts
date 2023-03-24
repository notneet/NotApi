import { BadRequestException } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, TransformFnParams } from 'class-transformer';
import { IsDateString, IsNotEmpty, IsString } from 'class-validator';
import * as moment from 'moment';

const dateTransform = ({ value }: TransformFnParams) => {
  const date = new Date(value);
  if (isNaN(date.getTime()))
    throw new BadRequestException(`"${value}" is not a valid date string.`);
  return moment(date).format('YYYY-MM-DD HH:mm:ss');
};

export class RequestDateConv {
  @IsDateString()
  @IsNotEmpty()
  @Transform(dateTransform)
  @ApiProperty()
  raw_date: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  timezone: string;
}
