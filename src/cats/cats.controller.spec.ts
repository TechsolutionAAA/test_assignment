import { Test, TestingModule } from '@nestjs/testing';
import { CatsController } from './cats.controller';
import { CatsService } from './cats.service';
import { CreateCatDto } from './validator/create-cat.dto';
import { UpdateCatDto } from './validator/update-cat.dto';

describe('CatsController', () => {
  let controller: CatsController;
  let mockCatsService: Partial<CatsService>;

  beforeEach(async () => {
    mockCatsService = {
      create: jest.fn().mockImplementation((dto: CreateCatDto) => Promise.resolve({ id: 1, ...dto })),
      findAll: jest.fn().mockImplementation(() => Promise.resolve([])),
      findById: jest.fn().mockImplementation((id: number) => Promise.resolve({ id, name: 'Test Cat' })),
      update: jest.fn().mockImplementation((dto: UpdateCatDto) => Promise.resolve({ id: 1, ...dto })),
      delete: jest.fn().mockImplementation((id: number) => Promise.resolve({})),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CatsController],
      providers: [
        {
          provide: CatsService,
          useValue: mockCatsService,
        },
      ],
    }).compile();

    controller = module.get<CatsController>(CatsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('create', () => {
    it('should call catsService.create with the CreateCatDto and return the result', async () => {
      const createCatDto = { name: 'Test Cat', age: 2, breed: 'Test Breed' };
      const result = await controller.create(createCatDto);

      expect(mockCatsService.create).toHaveBeenCalledWith(createCatDto);
      expect(result).toEqual({ id: 1, ...createCatDto });
    });
  });
  describe('findAll', () => {
    it('should call catsService.findAll and return an array of cats', async () => {
      const result = await controller.findAll();

      expect(mockCatsService.findAll).toHaveBeenCalled();
      expect(result).toEqual([]);
    });
  });
  describe('findOne', () => {
    it('should call catsService.findById with the correct id', async () => {
      const id = 1;
      const result = await controller.findOne(id);

      expect(mockCatsService.findById).toHaveBeenCalledWith(id);
      expect(result).toEqual({ id, name: 'Test Cat' });
    });
  });
  describe('update', () => {
    it('should call catsService.update with the UpdateCatDto and return the result', async () => {
      const updateCatDto = { id: 1, name: 'Updated Cat', age: 3, breed: 'Updated Breed' };
      const result = await controller.update(updateCatDto);

      expect(mockCatsService.update).toHaveBeenCalledWith(updateCatDto);
      expect(result).toEqual({ id: 1, ...updateCatDto });
    });
  });
  describe('delete', () => {
    it('should call catsService.delete with the correct id', async () => {
      const id = 1;
      const result = await controller.delete(id);

      expect(mockCatsService.delete).toHaveBeenCalledWith(id);
      expect(result).toEqual({ message: 'Cat has been deleted' });
    });
  });


});