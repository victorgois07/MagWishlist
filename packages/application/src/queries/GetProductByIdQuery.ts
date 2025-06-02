import { Product } from "@magwishlist/core/src/entities/Product";
import { IProductRepository } from "../interfaces/IProductRepository";
import { IQuery } from "./IQuery";

export class GetProductByIdQuery implements IQuery<Product | null> {
  constructor(
    private readonly productRepository: IProductRepository,
    private readonly productId: string,
  ) {}

  async execute(): Promise<Product | null> {
    return this.productRepository.findById(this.productId);
  }
}
