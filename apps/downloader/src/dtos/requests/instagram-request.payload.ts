import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class InstagramRequestPayload {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({ default: 'https://www.instagram.com/p/CoFWNoEvQ19/' })
  url: string;
}
