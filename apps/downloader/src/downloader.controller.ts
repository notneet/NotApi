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
import { RequestDownloaderPayload } from './dtos/requests/request-downloader.payload';
import { InstagramURLPipe } from './pipes/instagram-url.pipe';
import { YoutubeURLPipe } from './pipes/youtube-url.pipe';
import { DownloaderService } from './downloader.service';

@Controller('dl')
export class DownloaderController {
  constructor(private readonly downloaderService: DownloaderService) {}

  @Post('yt')
  @UsePipes(YoutubeURLPipe)
  @HttpCode(200)
  async handleYoutubeDownloader(@Body() reqUser: RequestDownloaderPayload) {
    return this.downloaderService.processYoutubeLink(reqUser.url);
  }

  @Get('yt/:token')
  async handleYoutubeToken(
    @Param('token') token: string,
    @Res() res: Response,
  ) {
    return res.redirect(`https://ytpp3.com${decodeURIComponent(token)}`);
  }

  @Post('ig')
  @UsePipes(InstagramURLPipe)
  @HttpCode(200)
  async handleInstagramDownloader(@Body() reqUser: RequestDownloaderPayload) {
    return this.downloaderService.processInstagramLink(reqUser.url);
  }

  @Get()
  getHello(): string {
    return this.downloaderService.getHello();
  }
}
