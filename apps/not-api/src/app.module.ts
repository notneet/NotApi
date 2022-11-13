import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PasswordGeneratorModule } from 'apps/password-generator/src/password-generator.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ['.env', ',env.prod', '.env.dev'],
    }),
    PasswordGeneratorModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
