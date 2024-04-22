import { Test, TestingModule } from '@nestjs/testing';
import { CatslikeController } from './catslike.controller';

describe('CatslikeController', () => {
  let controller: CatslikeController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatslikeController],
    }).compile();

    controller = module.get<CatslikeController>(CatslikeController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
