import { ProductId } from "../value-objects/ProductId";
import { UserId } from "../value-objects/UserId";
import { WishlistId } from "../value-objects/WishlistId";
import { DomainEvent } from "./DomainEvent";

export class WishlistItemAdded extends DomainEvent {
  constructor(
    public readonly wishlistId: WishlistId,
    public readonly userId: UserId,
    public readonly productId: ProductId,
  ) {
    super();
  }
}
