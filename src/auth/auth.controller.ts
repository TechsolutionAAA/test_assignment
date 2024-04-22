import { Body, Controller, Post, Req, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthGuard } from "@nestjs/passport";
import { RegisterDto } from "./validator/register.dto";
import { RequestWithUser } from "../cats/interfaces/request-with-user.type";

@Controller("auth")
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /**
   * Registers a new user with the provided registration data.
   *
   * @param body - The registration data to use for creating the new user account.
   * @returns The result of the registration operation.
   */
  @Post("register")
  async register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  /**
   * Logs in a user using the local authentication strategy.
   *
   * @param req - The request object containing the user's credentials.
   * @returns The result of the login operation.
   */
  @UseGuards(AuthGuard("local"))
  @Post("login")
  async login(@Req() req: RequestWithUser) {
    return this.authService.login(req);
  }
}
