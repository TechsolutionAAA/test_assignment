import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from "@nestjs/common";
import { RolesGuard } from "../common/guards/roles.guard";
import { ParseIntPipe } from "../common/pipes/parse-int.pipe";
import { CatsService } from "./cats.service";
import { CreateCatDto } from "./validator/create-cat.dto";
import { CatInterface } from "./interfaces/cat.interface";
import { UpdateCatDto } from "./validator/update-cat.dto";
import { AuthGuard } from "@nestjs/passport";
import { Roles } from "../common/decorators/roles.decorator";
import { UserRolesEnum } from "../user/interfaces/user.interface";
import { CatEntity } from "./entities/cat.entity";

@UseGuards(AuthGuard("jwt"), RolesGuard)
@Controller("cats")
export class CatsController {
  constructor(private readonly catsService: CatsService) {}

  /**
   * Creates a new cat entity.
   *
   * @param createCatDto - The data to create a new cat.
   * @returns The created cat entity.
   */
  @Post()
  @Roles(UserRolesEnum.Admin)
  create(@Body() createCatDto: CreateCatDto): Promise<CatEntity> {
    return this.catsService.create(createCatDto);
  }

  /**
   * Retrieves all cats.
   * @returns {Promise<CatInterface[]>} A promise that resolves to an array of cat entities.
   */
  @Get()
  findAll(): Promise<CatInterface[]> {
    return this.catsService.findAll();
  }

  /**
   * Retrieves a single cat entity by its unique identifier.
   *
   * @param id - The unique identifier of the cat to retrieve.
   * @returns A Promise that resolves to the retrieved CatEntity.
   */
  @Get(":id")
  findOne(
    @Param("id", new ParseIntPipe())
    id: number
  ): Promise<CatEntity> {
    return this.catsService.findById(id);
  }

  /**
   * Updates a cat.
   *
   * @param updateCatDto - The DTO containing the updated cat data.
   * @returns The updated cat.
   */
  @Put()
  @Roles(UserRolesEnum.Admin)
  update(@Body() updateCatDto: UpdateCatDto) {
    return this.catsService.update(updateCatDto);
  }

  /**
   * Deletes a cat by the specified ID.
   *
   * @param id - The ID of the cat to delete.
   * @returns An object with a message indicating the cat has been deleted.
   */
  @Delete(":id")
  @Roles(UserRolesEnum.Admin)
  async delete(
    @Param("id", new ParseIntPipe())
    id: number
  ) {
    await this.catsService.delete(id);
    return { message: "Cat has been deleted" };
  }
}
