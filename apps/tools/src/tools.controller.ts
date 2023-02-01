import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { RequestPWGenDto } from './dtos/requests/request-pwgen.dto';
import { ToolsService } from './tools.service';

@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post('pwgen')
  @HttpCode(200)
  async handlePWGenerator(@Body() body: RequestPWGenDto) {
    return this.toolsService.mixPassword(
      body.character_length,
      body.include_upper,
      body.include_number,
      body.include_symbol,
    );
  }

  @Get()
  getHello(): string {
    return this.toolsService.getHello();
  }
}
