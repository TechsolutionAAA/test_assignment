import { BadRequestException, Injectable } from "@nestjs/common";
import { CatInterface } from "./interfaces/cat.interface";
import { Repository } from "typeorm";
import { CatEntity } from "./entities/cat.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateCatDto } from "./validator/update-cat.dto";

@Injectable()
export class CatsService {
  constructor(
    @InjectRepository(CatEntity)
    private readonly repository: Repository<CatEntity>
  ) {}

  /**
   * Creates a new cat entity and saves it to the repository.
   *
   * @param cat - The cat entity to create.
   * @returns The created cat entity.
   */
  async create(cat: CatInterface): Promise<CatEntity> {
    return this.repository.save(cat);
  }

  /**
   * Retrieves all cats from the repository.
   * @returns {Promise<CatInterface[]>} An array of cat entities.
   */
  async findAll(): Promise<CatInterface[]> {
    return await this.repository.find();
  }

  /**
   * Finds a cat by its unique identifier.
   *
   * @param id - The ID of the cat to find.
   * @returns The found cat entity.
   * @throws {BadRequestException} If the cat is not found.
   */
  async findById(id: number): Promise<CatEntity> {
    const cat = await this.repository.findOne({ where: { id: id } });
    if (!cat) {
      throw new BadRequestException("Cat not found");
    }
    return await this.repository.findOne({ where: { id: id } });
  }

  /**
   * Deletes a cat by the provided ID.
   *
   * @param id - The ID of the cat to delete.
   * @returns A promise that resolves when the cat has been deleted.
   */
  async delete(id: number): Promise<void> {
    await this.repository.delete(id);
  }

  /**
   * Updates an existing cat in the database.
   *
   * @param updateCatDto - The DTO containing the updated cat data.
   * @returns The updated cat entity.
   * @throws Error if the cat does not exist.
   */
  async update(updateCatDto: UpdateCatDto) {
    const catId = updateCatDto.id;

    const cat = await this.findById(catId);
    if (!cat) {
      throw new Error("Update failed. Cat does not exist");
    }

    this.repository.merge(cat, { ...updateCatDto });

    return this.repository.save(cat);
  }
}
