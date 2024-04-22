import { Body, Controller, Get, Param, Post } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./validator/create-user.dto";
import { ParseIntPipe } from "../common/pipes/parse-int.pipe";

@Controller("user")
export class UserController {
  constructor(private readonly userService: UserService) {}

  /**
   * Creates a new user.
   *
   * @param createUserDto - The data required to create a new user.
   * @returns The created user.
   */
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.creatUser(createUserDto);
  }

  /**
   * Retrieves a single user by their unique identifier.
   *
   * @param id - The unique identifier of the user to retrieve.
   * @returns The user with the specified identifier.
   */
  @Get(":id")
  findOne(
    @Param("id", new ParseIntPipe())
    id: number
  ) {
    return this.userService.findUserById(id);
  }

  /**
   * Retrieves all users.
   * @returns {Promise<User[]>} An array of all users.
   */
  @Get()
  findAll() {
    return this.userService.findAll();
  }
}
