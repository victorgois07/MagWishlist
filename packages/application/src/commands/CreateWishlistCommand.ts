import { Wishlist } from "@magwishlist/core/src/entities/Wishlist";
import { UserId } from "@magwishlist/core/src/value-objects/UserId";
import { IWishlistRepository } from "../interfaces/IWishlistRepository";
import { ICommand } from "./ICommand";

export interface CreateWishlistCommandProps {
  userId: string;
  name: string;
  isPublic: boolean;
}

export class CreateWishlistCommand implements ICommand<Wishlist> {
  constructor(
    private readonly wishlistRepository: IWishlistRepository,
    private readonly props: CreateWishlistCommandProps,
  ) {}

  async execute(): Promise<Wishlist> {
    const wishlist = Wishlist.create({
      userId: UserId.create(this.props.userId),
      name: this.props.name,
      isPublic: this.props.isPublic,
    });

    await this.wishlistRepository.save(wishlist);
    return wishlist;
  }
}
