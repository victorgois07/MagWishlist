import { Wishlist } from "@magwishlist/core/src/entities/Wishlist";
import { UserId } from "@magwishlist/core/src/value-objects/UserId";
import { IWishlistRepository } from "../interfaces/IWishlistRepository";
import { IQuery } from "./IQuery";

export class GetWishlistsByUserIdQuery implements IQuery<Wishlist[]> {
  constructor(
    private readonly wishlistRepository: IWishlistRepository,
    private readonly userId: string,
  ) {}

  async execute(): Promise<Wishlist[]> {
    return this.wishlistRepository.findByUserId(UserId.create(this.userId));
  }
}
