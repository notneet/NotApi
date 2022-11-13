import { NestFactory } from '@nestjs/core';
import { PasswordGeneratorModule } from './password-generator.module';

async function bootstrap() {
  const app = await NestFactory.create(PasswordGeneratorModule);
  await app.listen(3000);
}
bootstrap();
