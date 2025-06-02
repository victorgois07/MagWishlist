import { ProductId } from "../value-objects/ProductId";
import { DomainEvent } from "./DomainEvent";

export class ProductCreated extends DomainEvent {
  constructor(
    public readonly productId: ProductId,
    public readonly name: string,
    public readonly sku: string,
  ) {
    super();
  }
}
