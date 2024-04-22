import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { UserEntity } from "./entities/user.entity";
import { CreateUserDto } from "./validator/create-user.dto";
import { UserRolesEnum } from "./interfaces/user.interface";
import * as bcrypt from "bcrypt";

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly repository: Repository<UserEntity>
  ) {}

  /**
   * Creates a new user with the provided user data.
   *
   * @param createUserDto - The data required to create a new user.
   * @returns The newly created user entity.
   */
  async creatUser(createUserDto: CreateUserDto): Promise<UserEntity> {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const user = this.repository.create({
      ...createUserDto,
      role: UserRolesEnum.User,
      password: hashedPassword,
    });

    return this.repository.save(user);
  }

  /**
   * Finds a user by their unique identifier.
   *
   * @param id - The unique identifier of the user to find.
   * @returns A promise that resolves to the found user entity.
   */
  async findUserById(id: number): Promise<UserEntity> {
    return this.repository.findOne({ where: { id: id } });
  }

  /**
   * Retrieves all user entities from the repository.
   * @returns A Promise that resolves to an array of `UserEntity` instances.
   */
  async findAll(): Promise<UserEntity[]> {
    return this.repository.find();
  }

  /**
   * Finds a user by their username.
   *
   * @param username - The username to search for.
   * @returns A promise that resolves to the found user entity.
   */
  async findUserByUsername(username: string): Promise<UserEntity> {
    return this.repository.findOne({ where: { username: username } });
  }
}
