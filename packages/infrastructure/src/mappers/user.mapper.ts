import { User } from "@magwishlist/core/src/entities/User";

export interface UserPersistenceModel {
  id: string;
  email: string;
  name: string;
  password: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class UserMapper {
  static toDomain(persistenceModel: UserPersistenceModel): User {
    return User.create({
      email: persistenceModel.email,
      name: persistenceModel.name,
      password: persistenceModel.password,
      isActive: persistenceModel.isActive,
    });
  }

  static toPersistence(domainModel: User): UserPersistenceModel {
    return {
      id: domainModel.id.value,
      email: domainModel.email,
      name: domainModel.name,
      password: domainModel.password,
      isActive: domainModel.isActive,
      createdAt: domainModel.createdAt,
      updatedAt: domainModel.updatedAt,
    };
  }
}
