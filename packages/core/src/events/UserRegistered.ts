import { UserId } from "../value-objects/UserId";
import { DomainEvent } from "./DomainEvent";

export class UserRegistered extends DomainEvent {
  constructor(
    public readonly userId: UserId,
    public readonly email: string,
  ) {
    super();
  }
}
