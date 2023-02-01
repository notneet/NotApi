import { HttpModule } from '@nestjs/axios';
import { Module, ValidationPipe } from '@nestjs/common';
import { APP_PIPE } from '@nestjs/core';
import { DownloaderController } from './downloader.controller';
import { DownloaderService } from './downloader.service';

@Module({
  imports: [HttpModule],
  controllers: [DownloaderController],
  providers: [
    DownloaderService,
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class DownloaderModule {}
