import { NestFactory } from '@nestjs/core';
import { DownloaderModule } from './downloader.module';

async function bootstrap() {
  const app = await NestFactory.create(DownloaderModule);
  await app.listen(3000);
}
bootstrap();
