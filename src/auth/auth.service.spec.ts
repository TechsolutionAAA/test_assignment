import {AuthController} from "./auth.controller";
import {AuthService} from "./auth.service";
import {Test, TestingModule} from "@nestjs/testing";
import {UserEntity} from "../user/entities/user.entity";
import {RegisterDto} from "./validator/register.dto";
import {UserRolesEnum} from "../user/interfaces/user.interface";
import {RequestWithUser} from "../cats/interfaces/request-with-user.type";

describe('AuthController', () => {
  let controller: AuthController;
  let mockAuthService: Partial<AuthService>;
  const mockUserEntity: UserEntity = {
    id: Date.now(),
    username: 'test@example.com',
    password: 'Password',
    role: UserRolesEnum.User,
    bookmarks: [],
    createdAt: new Date(),
    updatedAt: new Date(),
    deletedAt: new Date(),
  };

  beforeEach(async () => {
    mockAuthService = {
      register: jest.fn((dto: RegisterDto) => Promise.resolve(mockUserEntity)),
      login: jest.fn().mockImplementation((req) => Promise.resolve({ accessToken: 'test-token' })),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        {
          provide: AuthService,
          useValue: mockAuthService,
        },
      ],
    }).compile();

    controller = module.get<AuthController>(AuthController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('register', () => {
    it('call authService.register with RegisterDto and return', async () => {
      const registerDto: RegisterDto = { username: 'test@example.com', password: 'password' };
      const result = await controller.register(registerDto);

      expect(mockAuthService.register).toHaveBeenCalledWith(registerDto);
      expect(result).toHaveProperty('id');
      expect(result.username).toEqual(registerDto.username);
    });
  });
  describe('login', () => {
    it('should call authService.login and return a token', async () => {
      const req = { user: { userId: 1, username: 'test@example.com' } } as any as RequestWithUser
      const result = await controller.login(req);

      expect(mockAuthService.login).toHaveBeenCalledWith(req);
      expect(result).toEqual({ accessToken: 'test-token' });
    });
  });


});