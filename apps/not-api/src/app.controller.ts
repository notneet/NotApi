import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  showAPIDetail(): Record<string, any> {
    return this.appService.showAPIDetail();
  }
}
