import { Entity, ManyToOne } from "typeorm";
import { BaseEntity } from "../../common/entities/base.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { CatEntity } from "../../cats/entities/cat.entity";

@Entity()
/**
 * Represents a bookmark entity, which associates a user with a cat.
 * The `user` property references the user who created the bookmark.
 * The `cat` property references the cat that was bookmarked, and is eagerly loaded.
 */
export class CatslikeEntity extends BaseEntity {
  @ManyToOne(() => UserEntity, (user) => user.marks)
  user: UserEntity;

  @ManyToOne(() => CatEntity, (cat) => cat.marks, { eager: true })
  cat: CatEntity;
}
