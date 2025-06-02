import { ValueObject } from "./ValueObject";

export class WishlistId extends ValueObject<string> {
  private constructor(id: string) {
    super(id);
  }

  public static create(id?: string): WishlistId {
    return new WishlistId(id || crypto.randomUUID());
  }

  public get value(): string {
    return this.props;
  }
}
