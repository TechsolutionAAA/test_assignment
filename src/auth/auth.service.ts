import { BadRequestException, Injectable } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { JwtService } from "@nestjs/jwt";
import { RegisterDto } from "./validator/register.dto";
import { UserEntity } from "../user/entities/user.entity";
import * as bcrypt from "bcrypt";
import { UserInterface } from "../user/interfaces/user.interface";
import { RequestWithUser } from "../cats/interfaces/request-with-user.type";

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService
  ) {}

  /**
   * Registers a new user with the provided registration data.
   *
   * @param registerDto - The registration data for the new user.
   * @returns A promise that resolves to the newly created user entity.
   * @throws BadRequestException if the user is already registered.
   */
  async register(registerDto: RegisterDto): Promise<UserEntity> {
    const user = await this.userService.findUserByUsername(
      registerDto.username
    );
    if (user) {
      throw new BadRequestException("This user is already registered");
    }

    return await this.userService.creatUser(registerDto);
  }

  /**
   * Generates an access token for the authenticated user.
   *
   * @param req - The request object containing the authenticated user.
   * @returns An object with the generated access token.
   */
  async login(req: RequestWithUser): Promise<{ access_token: string }> {
    const user = req?.user as UserInterface;
    const payload = { username: req.user.username, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  /**
   * Validates a user's credentials by checking the provided username and password against the stored user information.
   *
   * @param username - The username of the user to validate.
   * @param pass - The password of the user to validate.
   * @returns A promise that resolves to the user object if the credentials are valid, or null if the credentials are invalid.
   */
  async validateUser(username: string, pass: string): Promise<any> {
    const user = await this.userService.findUserByUsername(username);

    if (user) {
      const isMatch = await bcrypt.compare(pass, user.password);
      if (isMatch) {
        const { password, ...result } = user;
        return result;
      }
    }
    return null;
  }
}
