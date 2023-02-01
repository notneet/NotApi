import { Test, TestingModule } from '@nestjs/testing';
import { ToolsController } from './tools.controller';
import { ToolsService } from './tools.service';

describe('ToolsController', () => {
  let toolsController: ToolsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [ToolsController],
      providers: [ToolsService],
    }).compile();

    toolsController = app.get<ToolsController>(ToolsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(toolsController.getHello()).toBe('Hello World!');
    });
  });
});
