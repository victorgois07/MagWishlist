import { Wishlist } from "@magwishlist/core/src/entities/Wishlist";
import { UserId } from "@magwishlist/core/src/value-objects/UserId";

export interface WishlistItemPersistenceModel {
  productId: string;
  addedAt: Date;
}

export interface WishlistPersistenceModel {
  id: string;
  userId: string;
  name: string;
  isPublic: boolean;
  items: WishlistItemPersistenceModel[];
  createdAt: Date;
  updatedAt: Date;
}

export class WishlistMapper {
  static toDomain(persistenceModel: WishlistPersistenceModel): Wishlist {
    return Wishlist.create({
      userId: UserId.create(persistenceModel.userId),
      name: persistenceModel.name,
      isPublic: persistenceModel.isPublic,
    });
  }

  static toPersistence(domainModel: Wishlist): WishlistPersistenceModel {
    return {
      id: domainModel.id.value,
      userId: domainModel.userId.value,
      name: domainModel.name,
      isPublic: domainModel.isPublic,
      items: domainModel.items.map((item) => ({
        productId: item.productId.value,
        addedAt: item.addedAt,
      })),
      createdAt: domainModel.createdAt,
      updatedAt: domainModel.updatedAt,
    };
  }
}
