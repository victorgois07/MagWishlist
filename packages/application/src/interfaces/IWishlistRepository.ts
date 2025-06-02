import { Wishlist } from "@magwishlist/core/src/entities/Wishlist";
import { UserId } from "@magwishlist/core/src/value-objects/UserId";
import { IRepository } from "./IRepository";

export interface IWishlistRepository extends IRepository<Wishlist> {
  findByUserId(userId: UserId): Promise<Wishlist[]>;
  findPublic(): Promise<Wishlist[]>;
}
