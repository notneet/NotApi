import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class RequestDownloaderPayload {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty()
  url: string;
}
