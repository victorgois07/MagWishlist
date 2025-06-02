import { AggregateRoot } from "../aggregates/AggregateRoot";
import { Money } from "../value-objects/Money";
import { ProductId } from "../value-objects/ProductId";

export interface ProductProps {
  id: ProductId;
  name: string;
  description: string;
  price: Money;
  sku: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class Product extends AggregateRoot<ProductProps> {
  private constructor(props: ProductProps) {
    super(props);
  }

  public static create(
    props: Omit<ProductProps, "id" | "createdAt" | "updatedAt">,
  ): Product {
    const now = new Date();
    return new Product({
      ...props,
      id: ProductId.create(),
      createdAt: now,
      updatedAt: now,
    });
  }

  public get id(): ProductId {
    return this.props.id;
  }

  public get name(): string {
    return this.props.name;
  }

  public get description(): string {
    return this.props.description;
  }

  public get price(): Money {
    return this.props.price;
  }

  public get sku(): string {
    return this.props.sku;
  }

  public get isActive(): boolean {
    return this.props.isActive;
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public updateDetails(name: string, description: string, price: Money): void {
    this.props.name = name;
    this.props.description = description;
    this.props.price = price;
    this.props.updatedAt = new Date();
  }

  public activate(): void {
    if (this.props.isActive) {
      throw new Error("Product is already active");
    }
    this.props.isActive = true;
    this.props.updatedAt = new Date();
  }

  public deactivate(): void {
    if (!this.props.isActive) {
      throw new Error("Product is already inactive");
    }
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }
}
