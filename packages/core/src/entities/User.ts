import { AggregateRoot } from "../aggregates/AggregateRoot";
import { UserRegistered } from "../events/UserRegistered";
import { UserId } from "../value-objects/UserId";

export interface UserProps {
  id: UserId;
  email: string;
  name: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class User extends AggregateRoot<UserProps> {
  private constructor(props: UserProps) {
    super(props);
  }

  public static create(
    props: Omit<UserProps, "id" | "createdAt" | "updatedAt">,
  ): User {
    const now = new Date();
    const user = new User({
      ...props,
      id: UserId.create(),
      createdAt: now,
      updatedAt: now,
    });

    user.addDomainEvent(new UserRegistered(user.id, user.email));
    return user;
  }

  public get id(): UserId {
    return this.props.id;
  }

  public get email(): string {
    return this.props.email;
  }

  public get name(): string {
    return this.props.name;
  }

  public get password(): string {
    return this.props.password;
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

  public updateProfile(name: string): void {
    this.props.name = name;
    this.props.updatedAt = new Date();
  }

  public updatePassword(password: string): void {
    this.props.password = password;
    this.props.updatedAt = new Date();
  }

  public deactivate(): void {
    if (!this.props.isActive) {
      throw new Error("User is already inactive");
    }
    this.props.isActive = false;
    this.props.updatedAt = new Date();
  }

  public activate(): void {
    if (this.props.isActive) {
      throw new Error("User is already active");
    }
    this.props.isActive = true;
    this.props.updatedAt = new Date();
  }
}
