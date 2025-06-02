import { ValueObject } from "./ValueObject";

export class ProductId extends ValueObject<string> {
  private constructor(id: string) {
    super(id);
  }

  public static create(id?: string): ProductId {
    return new ProductId(id || crypto.randomUUID());
  }

  public get value(): string {
    return this.props;
  }
}
