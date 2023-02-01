import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { RequestDownloaderPayload } from '../dtos/requests/request-downloader.payload';

@Injectable()
export class YoutubeURLPipe implements PipeTransform {
  transform(value: RequestDownloaderPayload, metadata: ArgumentMetadata) {
    if (!this.isValidYoutubeURL(value.url)) throw new BadRequestException();
    return value;
  }

  private isValidYoutubeURL(url: string) {
    const YtPattern = /^.*youtube\.com\/watch\?v=.*$/;
    return YtPattern.test(url);
  }
}
