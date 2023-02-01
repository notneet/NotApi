import { EnvDef, EnvKey } from '@libs/commons';
import { Logger } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const configModule = await NestFactory.createApplicationContext(
    ConfigModule.forRoot({ envFilePath: ['.env', ',env.prod', '.env.dev'] }),
  );
  const configService = configModule.get(ConfigService);
  const port = configService.get<number>(EnvKey.APP_PORT, EnvDef.DEF_APP_PORT);
  const app = await NestFactory.create(AppModule);
  const config = new DocumentBuilder()
    .setTitle('NotNeet API Documentation')
    .setDescription('The notneet API documentation')
    .setVersion(configService.get<string>(EnvKey.API_VERSION, '0.0.1'))
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  await app.listen(port, () => {
    Logger.log(`App running on port ${port} 🚀`);
  });
}
bootstrap();
