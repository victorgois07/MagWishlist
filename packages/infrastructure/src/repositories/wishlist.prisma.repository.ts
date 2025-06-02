import { IWishlistRepository } from "@magwishlist/application/src/interfaces/IWishlistRepository";
import { Wishlist } from "@magwishlist/core/src/entities/Wishlist";
import { UserId } from "@magwishlist/core/src/value-objects/UserId";
import { PrismaClient } from "@prisma/client";
import { Wishlist as PrismaWishlist } from "@magwishlist/infrastructure/prisma";

export class WishlistPrismaRepository implements IWishlistRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Wishlist | null> {
    const wishlist = await this.prisma.wishlist.findUnique({
      where: { id },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    if (!wishlist) {
      return null;
    }

    return Wishlist.create({
      userId: UserId.create(wishlist.userId),
      name: wishlist.name,
      isPublic: wishlist.isPublic,
    });
  }

  async findAll(): Promise<Wishlist[]> {
    const wishlists = await this.prisma.wishlist.findMany({
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return wishlists.map((wishlist: PrismaWishlist) =>
      Wishlist.create({
        userId: UserId.create(wishlist.userId),
        name: wishlist.name,
        isPublic: wishlist.isPublic,
      }),
    );
  }

  async findByUserId(userId: UserId): Promise<Wishlist[]> {
    const wishlists = await this.prisma.wishlist.findMany({
      where: { userId: userId.value },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return wishlists.map((wishlist: PrismaWishlist) =>
      Wishlist.create({
        userId: UserId.create(wishlist.userId),
        name: wishlist.name,
        isPublic: wishlist.isPublic,
      }),
    );
  }

  async findPublic(): Promise<Wishlist[]> {
    const wishlists = await this.prisma.wishlist.findMany({
      where: { isPublic: true },
      include: {
        products: {
          include: {
            product: true,
          },
        },
      },
    });

    return wishlists.map((wishlist: PrismaWishlist) =>
      Wishlist.create({
        userId: UserId.create(wishlist.userId),
        name: wishlist.name,
        isPublic: wishlist.isPublic,
      }),
    );
  }

  async save(wishlist: Wishlist): Promise<void> {
    await this.prisma.wishlist.upsert({
      where: { id: wishlist.id.value },
      create: {
        id: wishlist.id.value,
        userId: wishlist.userId.value,
        name: wishlist.name,
        isPublic: wishlist.isPublic,
        createdAt: wishlist.createdAt,
        updatedAt: wishlist.updatedAt,
        products: {
          create: wishlist.items.map((item) => ({
            productId: item.productId.value,
            createdAt: item.addedAt,
            updatedAt: item.addedAt,
          })),
        },
      },
      update: {
        name: wishlist.name,
        isPublic: wishlist.isPublic,
        updatedAt: wishlist.updatedAt,
        products: {
          deleteMany: {},
          create: wishlist.items.map((item) => ({
            productId: item.productId.value,
            createdAt: item.addedAt,
            updatedAt: item.addedAt,
          })),
        },
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.wishlist.delete({
      where: { id },
    });
  }
}
