import { Test, TestingModule } from '@nestjs/testing';
import { PasswordGeneratorController } from './password-generator.controller';
import { PasswordGeneratorService } from './password-generator.service';

describe('PasswordGeneratorController', () => {
  let passwordGeneratorController: PasswordGeneratorController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [PasswordGeneratorController],
      providers: [PasswordGeneratorService],
    }).compile();

    passwordGeneratorController = app.get<PasswordGeneratorController>(PasswordGeneratorController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(passwordGeneratorController.getHello()).toBe('Hello World!');
    });
  });
});
