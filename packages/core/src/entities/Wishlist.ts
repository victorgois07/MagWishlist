import { AggregateRoot } from "../aggregates/AggregateRoot";
import { WishlistItemAdded } from "../events/WishlistItemAdded";
import { ProductId } from "../value-objects/ProductId";
import { UserId } from "../value-objects/UserId";
import { WishlistId } from "../value-objects/WishlistId";

export interface WishlistItem {
  productId: ProductId;
  addedAt: Date;
}

export interface WishlistProps {
  id: WishlistId;
  userId: UserId;
  name: string;
  isPublic: boolean;
  items: WishlistItem[];
  createdAt: Date;
  updatedAt: Date;
}

export class Wishlist extends AggregateRoot<WishlistProps> {
  private constructor(props: WishlistProps) {
    super(props);
  }

  public static create(
    props: Omit<WishlistProps, "id" | "items" | "createdAt" | "updatedAt">,
  ): Wishlist {
    const now = new Date();
    return new Wishlist({
      ...props,
      id: WishlistId.create(),
      items: [],
      createdAt: now,
      updatedAt: now,
    });
  }

  public get id(): WishlistId {
    return this.props.id;
  }

  public get userId(): UserId {
    return this.props.userId;
  }

  public get name(): string {
    return this.props.name;
  }

  public get isPublic(): boolean {
    return this.props.isPublic;
  }

  public get items(): WishlistItem[] {
    return [...this.props.items];
  }

  public get createdAt(): Date {
    return this.props.createdAt;
  }

  public get updatedAt(): Date {
    return this.props.updatedAt;
  }

  public addItem(productId: ProductId): void {
    if (this.hasItem(productId)) {
      throw new Error("Product already exists in wishlist");
    }

    const now = new Date();
    this.props.items.push({
      productId,
      addedAt: now,
    });
    this.props.updatedAt = now;

    this.addDomainEvent(new WishlistItemAdded(this.id, this.userId, productId));
  }

  public removeItem(productId: ProductId): void {
    if (!this.hasItem(productId)) {
      throw new Error("Product not found in wishlist");
    }

    this.props.items = this.props.items.filter(
      (item) => !item.productId.equals(productId),
    );
    this.props.updatedAt = new Date();
  }

  public updateName(name: string): void {
    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  public makePublic(): void {
    if (this.props.isPublic) {
      throw new Error("Wishlist is already public");
    }
    this.props.isPublic = true;
    this.props.updatedAt = new Date();
  }

  public makePrivate(): void {
    if (!this.props.isPublic) {
      throw new Error("Wishlist is already private");
    }
    this.props.isPublic = false;
    this.props.updatedAt = new Date();
  }

  private hasItem(productId: ProductId): boolean {
    return this.props.items.some((item) => item.productId.equals(productId));
  }
}
