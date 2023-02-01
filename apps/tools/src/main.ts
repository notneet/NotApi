import { NestFactory } from '@nestjs/core';
import { ToolsModule } from './tools.module';

async function bootstrap() {
  const app = await NestFactory.create(ToolsModule);
  await app.listen(3000);
}
bootstrap();
