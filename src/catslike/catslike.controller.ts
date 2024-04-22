import { Controller, Delete, Param, Post, UseGuards } from "@nestjs/common";
import { CatslikeService } from "./catslike.service";
import { AuthGuard } from "@nestjs/passport";
import { GetUser } from "../common/decorators/get-user.decorator";

@Controller("catslike")
export class CatslikeController {
  constructor(private readonly catslikeService: CatslikeService) {}

  /**
   * Adds a new bookmark for the authenticated user with the specified category ID.
   *
   * @param user - The authenticated user.
   * @param catId - The ID of the category to add the bookmark to.
   * @returns A promise that resolves to the result of adding the bookmark.
   */
  @Post(":catId")
  @UseGuards(AuthGuard("jwt"))
  addMark(@GetUser() user, @Param("catId") catId: number) {
    return this.catslikeService.addmark(user.id, catId);
  }

  /**
   * Removes a bookmark for the authenticated user.
   *
   * @param user - The authenticated user.
   * @param catId - The ID of the bookmark to remove.
   * @returns A promise that resolves when the bookmark is removed.
   */
  @Delete(":catId")
  @UseGuards(AuthGuard("jwt"))
  removeMark(@GetUser() user, @Param("catId") catId: number) {
    return this.catslikeService.removemark(user.id, catId);
  }
}
