import { BadRequestException, Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CatslikeEntity } from "./entities/catslike.entity";
import { Repository } from "typeorm";
import { UserService } from "../user/user.service";
import { CatsService } from "../cats/cats.service";

@Injectable()
export class CatslikeService {
  constructor(
    @InjectRepository(CatslikeEntity)
    private readonly catslikeRepository: Repository<CatslikeEntity>,
    private readonly userService: UserService,
    private catService: CatsService
  ) {}
  async addmark(userId: number, catId: number): Promise<CatslikeEntity> {
    const cat = await this.catService.findById(catId);
    if (!cat) {
      throw new BadRequestException("Cat not available");
    }
    const user = await this.userService.findUserById(userId);
    if (!user) {
      throw new BadRequestException("User has no user account");
    }

    const existingMark = await this.catslikeRepository.findOne({
      where: {
        cat: { id: catId },
        user: { id: userId },
      },
    });

    if (existingMark) {
      throw new BadRequestException(
        "There is already a Mark for this cat and this user."
      );
    }

    const newMark = this.catslikeRepository.create({
      user,
      cat,
    });
    return await this.catslikeRepository.save(newMark);
  }

  async removemark(userId: number, catId: number): Promise<void> {
    const Mark = await this.catslikeRepository.findOne({
      where: {
        user: { id: userId },
        cat: { id: catId },
      },
    });

    if (!Mark) {
      throw new BadRequestException(`No Mark found`);
    }

    await this.catslikeRepository.remove(Mark);
  }
}
