import { Test, TestingModule } from '@nestjs/testing';
import { CatslikeService } from './catslike.service';

describe('CatslikeService', () => {
  let service: CatslikeService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CatslikeService],
    }).compile();

    service = module.get<CatslikeService>(CatslikeService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
