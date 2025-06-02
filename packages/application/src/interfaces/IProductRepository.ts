import { Product } from "@magwishlist/core/src/entities/Product";
import { IRepository } from "./IRepository";

export interface IProductRepository extends IRepository<Product> {
  findBySku(sku: string): Promise<Product | null>;
  findActive(): Promise<Product[]>;
}
