import { DomainEvent } from "../events/DomainEvent";

export abstract class AggregateRoot<T> {
  protected readonly props: T;
  private _domainEvents: DomainEvent[] = [];

  constructor(props: T) {
    this.props = props;
  }

  protected addDomainEvent(domainEvent: DomainEvent): void {
    this._domainEvents.push(domainEvent);
  }

  public clearEvents(): void {
    this._domainEvents = [];
  }

  public get domainEvents(): DomainEvent[] {
    return this._domainEvents;
  }
}
