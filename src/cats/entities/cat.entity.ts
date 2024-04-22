import {Column, Entity, OneToMany} from "typeorm";
import {BaseEntity} from "../../common/entities/base.entity";
import {CatInterface} from "../interfaces/cat.interface";
import {CatslikeEntity} from "../../catslike/entities/catslike.entity";

@Entity()
/**
 * Represents a Cat entity in the application.
 *
 * The `CatEntity` class extends the `BaseEntity` class and implements the `CatInterface` interface.
 * It defines the properties and relationships for a Cat entity, including the cat's name, age, breed,
 * and any associated bookmarks.
 */
export class CatEntity extends BaseEntity implements CatInterface {
  @Column({ type: "varchar" })
  name: string;

  @Column({ type: "integer" })
  age: number;

  @Column({ type: "varchar" })
  breed: string;

  @OneToMany(() => CatslikeEntity, (bookmark) => bookmark.cat)
  marks: CatslikeEntity[];
}
