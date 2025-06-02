import { User } from "@magwishlist/core/src/entities/User";
import { IRepository } from "./IRepository";

export interface IUserRepository extends IRepository<User> {
  findByEmail(email: string): Promise<User | null>;
  findActive(): Promise<User[]>;
}
