import { ProductId } from "@magwishlist/core/src/value-objects/ProductId";
import { IProductRepository } from "../interfaces/IProductRepository";
import { IWishlistRepository } from "../interfaces/IWishlistRepository";
import { ICommand } from "./ICommand";

export interface AddItemToWishlistCommandProps {
  wishlistId: string;
  productId: string;
}

export class AddItemToWishlistCommand implements ICommand<void> {
  constructor(
    private readonly wishlistRepository: IWishlistRepository,
    private readonly productRepository: IProductRepository,
    private readonly props: AddItemToWishlistCommandProps,
  ) {}

  async execute(): Promise<void> {
    const wishlist = await this.wishlistRepository.findById(
      this.props.wishlistId,
    );
    if (!wishlist) {
      throw new Error("Wishlist not found");
    }

    const product = await this.productRepository.findById(this.props.productId);
    if (!product) {
      throw new Error("Product not found");
    }

    wishlist.addItem(ProductId.create(this.props.productId));
    await this.wishlistRepository.save(wishlist);
  }
}
