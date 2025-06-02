import { ValueObject } from "./ValueObject";

export class UserId extends ValueObject<string> {
  private constructor(id: string) {
    super(id);
  }

  public static create(id?: string): UserId {
    return new UserId(id || crypto.randomUUID());
  }

  public get value(): string {
    return this.props;
  }
}
