import { DomainException } from "./DomainException";

export class NotFoundException extends DomainException {
  constructor(entityName: string, id: string) {
    super(`${entityName} with id ${id} not found`);
    this.name = "NotFoundException";
  }
}
