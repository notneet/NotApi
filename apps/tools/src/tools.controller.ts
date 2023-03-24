import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Post,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiExcludeEndpoint,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { RequestDateConv } from './dtos/requests/request-dateconv.dto';
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

  @Post('date-conv')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'DateTime converted by timezone.',
  })
  @ApiOkResponse({
    description: 'Return converted datetime by timezone region.',
  })
  @ApiBadRequestResponse({
    description: 'Please check the payload.',
  })
  async handleDateConverter(@Body() body: RequestDateConv) {
    return this.toolsService.dateConv(body.raw_date, body.timezones);
  }

  @Get()
  @ApiExcludeEndpoint()
  getHello(): string {
    return this.toolsService.getHello();
  }
}
