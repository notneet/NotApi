import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { DownloaderModule } from 'apps/downloader/src/downloader.module';
import { ToolsModule } from 'apps/tools/src/tools.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', ',env.prod', '.env.dev'],
    }),
    ToolsModule,
    DownloaderModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
