import {Module} from '@nestjs/common';
import {CatslikeService} from './catslike.service';
import {CatslikeController} from './catslike.controller';
import {TypeOrmModule} from "@nestjs/typeorm";
import {CatslikeEntity} from "./entities/catslike.entity";
import {UserModule} from "../user/user.module";
import {CatsModule} from "../cats/cats.module";

@Module({
  imports: [TypeOrmModule.forFeature([CatslikeEntity]), UserModule, CatsModule],
  providers: [CatslikeService],
  controllers: [CatslikeController]
})
export class CatslikeModule {}