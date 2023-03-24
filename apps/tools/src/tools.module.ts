import { DateTimeModule } from '@libs/commons/helper/date-time/date-time.module';
import { Module, ValidationPipe } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE } from '@nestjs/core';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), DateTimeModule],
  controllers: [ToolsController],
  providers: [
    ToolsService,
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe({
        whitelist: true,
      }),
    },
  ],
})
export class ToolsModule {}
