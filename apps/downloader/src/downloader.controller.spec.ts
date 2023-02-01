import { Test, TestingModule } from '@nestjs/testing';
import { DownloaderController } from './downloader.controller';
import { DownloaderService } from './downloader.service';

describe('DownloaderController', () => {
  let downloaderController: DownloaderController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [DownloaderController],
      providers: [DownloaderService],
    }).compile();

    downloaderController = app.get<DownloaderController>(DownloaderController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(downloaderController.getHello()).toBe('Hello World!');
    });
  });
});
