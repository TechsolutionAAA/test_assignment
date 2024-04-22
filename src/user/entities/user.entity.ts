import {Column, Entity, OneToMany} from "typeorm";
import {UserInterface, UserRolesEnum} from "../interfaces/user.interface";
import {BaseEntity} from "../../common/entities/base.entity";
import {Exclude} from "class-transformer";
import { CatslikeEntity } from "src/catslike/entities/catslike.entity";

@Entity()
/**
 * Represents a user entity in the application.
 *
 * @property {string} username - The unique username of the user.
 * @property {string} password - The hashed password of the user.
 * @property {UserRolesEnum} role - The role of the user, which determines their permissions.
 * @property {CatslikeEntity[]} bookmarks - The bookmarks associated with the user, eagerly loaded.
 */
export class UserEntity extends BaseEntity implements UserInterface {
  @Column({ type: "varchar", unique: true })
  username: string;

  @Column({ type: "varchar" })
  @Exclude()
  password: string;

  @Column({ type: "enum", enum: UserRolesEnum })
  role: UserRolesEnum;

  @OneToMany(() => CatslikeEntity, (bookmark) => bookmark.user, { eager: true })
  marks: CatslikeEntity[];
}
