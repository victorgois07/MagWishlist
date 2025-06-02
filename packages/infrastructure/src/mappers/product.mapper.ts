import { Product } from "@magwishlist/core/src/entities/Product";
import { Money } from "@magwishlist/core/src/value-objects/Money";

export interface ProductPersistenceModel {
  id: string;
  name: string;
  description: string;
  price: number;
  currency: string;
  sku: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export class ProductMapper {
  static toDomain(persistenceModel: ProductPersistenceModel): Product {
    return Product.create({
      name: persistenceModel.name,
      description: persistenceModel.description,
      price: Money.create(
        persistenceModel.price,
        persistenceModel.currency as any,
      ),
      sku: persistenceModel.sku,
      isActive: persistenceModel.isActive,
    });
  }

  static toPersistence(domainModel: Product): ProductPersistenceModel {
    return {
      id: domainModel.id.value,
      name: domainModel.name,
      description: domainModel.description,
      price: domainModel.price.amount,
      currency: domainModel.price.currency,
      sku: domainModel.sku,
      isActive: domainModel.isActive,
      createdAt: domainModel.createdAt,
      updatedAt: domainModel.updatedAt,
    };
  }
}
