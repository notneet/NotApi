import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class YoutubeRequestPayload {
  @IsNotEmpty()
  @IsString()
  @IsUrl()
  @ApiProperty({ default: 'https://www.youtube.com/watch?v=Ksah1CXA-bA' })
  url: string;
}
