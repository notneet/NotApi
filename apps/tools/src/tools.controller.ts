import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RequestPWGenDto } from './dtos/requests/request-pwgen.dto';
import { ToolsService } from './tools.service';

@ApiTags('Tools')
@Controller('tools')
export class ToolsController {
  constructor(private readonly toolsService: ToolsService) {}

  @Post('pwgen')
  @HttpCode(200)
  @ApiOperation({
    summary: 'Get info of instagram download link.',
  })
  @ApiOkResponse({
    description: 'Return random password string.',
  })
  @ApiBadRequestResponse({
    description: 'Please check the payload.',
  })
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
