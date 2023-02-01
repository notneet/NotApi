import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { InstagramRequestPayload } from '../dtos/requests/instagram-request.payload';

@Injectable()
export class InstagramURLPipe implements PipeTransform {
  transform(value: InstagramRequestPayload, metadata: ArgumentMetadata) {
    if (!this.isValidInstagramURL(value.url)) throw new BadRequestException();
    return value;
  }

  private isValidInstagramURL(url: string) {
    const igPattern = /^.*instagram\.com\/p\/[a-zA-Z0-9-_]+\/?$/;
    return igPattern.test(url);
  }
}
