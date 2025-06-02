import { IEventDispatcher } from "@magwishlist/application/src/interfaces/IEventDispatcher";
import { DomainEvent } from "@magwishlist/core/src/events/DomainEvent";

export class EventDispatcherService implements IEventDispatcher {
  private handlers: Map<string, ((event: DomainEvent) => Promise<void>)[]> =
    new Map();

  register(
    eventName: string,
    handler: (event: DomainEvent) => Promise<void>,
  ): void {
    if (!this.handlers.has(eventName)) {
      this.handlers.set(eventName, []);
    }
    this.handlers.get(eventName)?.push(handler);
  }

  async dispatch(event: DomainEvent): Promise<void> {
    const eventName = event.constructor.name;
    const handlers = this.handlers.get(eventName) || [];

    console.log(`[EventDispatcher] Dispatching event ${eventName}`);

    await Promise.all(
      handlers.map((handler) =>
        handler(event).catch((error) => {
          console.error(
            `[EventDispatcher] Error handling event ${eventName}:`,
            error,
          );
        }),
      ),
    );
  }

  async dispatchAll(events: DomainEvent[]): Promise<void> {
    await Promise.all(events.map((event) => this.dispatch(event)));
  }
}
