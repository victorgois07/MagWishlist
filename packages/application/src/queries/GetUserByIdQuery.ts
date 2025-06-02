import { User } from "@magwishlist/core/src/entities/User";
import { IUserRepository } from "../interfaces/IUserRepository";
import { IQuery } from "./IQuery";

export class GetUserByIdQuery implements IQuery<User | null> {
  constructor(
    private readonly userRepository: IUserRepository,
    private readonly userId: string,
  ) {}

  async execute(): Promise<User | null> {
    return this.userRepository.findById(this.userId);
  }
}
