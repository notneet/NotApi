import {
  Body,
  Controller,
  Get,
  HttpCode,
  Param,
  Post,
  Res,
  UsePipes,
} from '@nestjs/common';
import { Response } from 'express';
import { YoutubeRequestPayload } from './dtos/requests/youtube-request.payload';
import { InstagramURLPipe } from './pipes/instagram-url.pipe';
import { YoutubeURLPipe } from './pipes/youtube-url.pipe';
import { DownloaderService } from './downloader.service';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { InstagramRequestPayload } from './dtos/requests/instagram-request.payload';

@ApiTags('Downloader')
@Controller('dl')
export class DownloaderController {
  constructor(private readonly downloaderService: DownloaderService) {}

  @Post('yt')
  @UsePipes(YoutubeURLPipe)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get info of youtube download link.',
  })
  @ApiOkResponse({
    description: 'Return information of youtube downloader token.',
  })
  @ApiBadRequestResponse({
    description: 'Please check the payload.',
  })
  async handleYoutubeDownloader(@Body() reqUser: YoutubeRequestPayload) {
    return this.downloaderService.processYoutubeLink(reqUser.url);
  }

  @Get('yt/:token')
  @ApiOperation({
    summary: 'Process token youtube download link.',
  })
  @ApiOkResponse({
    description: 'Return decoded youtube download link.',
  })
  @ApiBadRequestResponse({
    description: 'Please check the payload.',
  })
  async handleYoutubeToken(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    return res.redirect(`https://ytpp3.com${decodeURIComponent(token)}`);
  }

  @Post('ig')
  @UsePipes(InstagramURLPipe)
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get info of instagram download link.',
  })
  @ApiOkResponse({
    description: 'Return information of instagram download link.',
  })
  @ApiBadRequestResponse({
    description: 'Please check the payload.',
  })
  async handleInstagramDownloader(@Body() reqUser: InstagramRequestPayload) {
    return this.downloaderService.processInstagramLink(reqUser.url);
  }

  @Get()
  getHello(): string {
    return this.downloaderService.getHello();
  }
}
