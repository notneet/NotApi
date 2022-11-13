import { EnvDef, EnvKey } from '@libs/commons';
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const configModule = await NestFactory.createApplicationContext(
    ConfigModule.forRoot({ envFilePath: ['.env', ',env.prod', '.env.dev'] }),
  );
  const configService = configModule.get(ConfigService);
  const port = configService.get<number>(EnvKey.APP_PORT, EnvDef.DEF_APP_PORT);
  const app = await NestFactory.create(AppModule);

  await app.listen(port, () => {
    Logger.log(`App running on port ${port} 🚀`);
  });
}
bootstrap();
