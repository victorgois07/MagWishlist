import { IUserRepository } from "@magwishlist/application/src/interfaces/IUserRepository";
import { User } from "@magwishlist/core/src/entities/User";
import { PrismaClient } from "@prisma/client";
import { User as PrismaUser } from "@magwishlist/infrastructure/prisma";

export class UserPrismaRepository implements IUserRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });

    if (!user) {
      return null;
    }

    return User.create({
      email: user.email,
      name: user.name,
      isActive: user.isActive,
      password: user.password,
    });
  }

  async findAll(): Promise<User[]> {
    const users = await this.prisma.user.findMany();
    return users.map((user: PrismaUser) =>
      User.create({
        email: user.email,
        name: user.name,
        isActive: user.isActive,
        password: user.password,
      }),
    );
  }

  async findByEmail(email: string): Promise<User | null> {
    const user = await this.prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      return null;
    }

    return User.create({
      email: user.email,
      name: user.name,
      isActive: user.isActive,
      password: user.password,
    });
  }

  async findActive(): Promise<User[]> {
    const users = await this.prisma.user.findMany({
      where: { isActive: true },
    });

    return users.map((user: PrismaUser) =>
      User.create({
        email: user.email,
        name: user.name,
        isActive: user.isActive,
        password: user.password,
      }),
    );
  }

  async save(user: User): Promise<void> {
    await this.prisma.user.upsert({
      where: { id: user.id.value },
      create: {
        id: user.id.value,
        email: user.email,
        name: user.name,
        isActive: user.isActive,
        password: user.password,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      update: {
        email: user.email,
        name: user.name,
        isActive: user.isActive,
        password: user.password,
        updatedAt: user.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.user.delete({
      where: { id },
    });
  }
}
