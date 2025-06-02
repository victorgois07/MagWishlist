import { DomainEvent } from "@magwishlist/core/src/events/DomainEvent";

export interface IEventDispatcher {
  dispatch(event: DomainEvent): Promise<void>;
  dispatchAll(events: DomainEvent[]): Promise<void>;
}
