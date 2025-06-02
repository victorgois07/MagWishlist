import { IProductRepository } from "@magwishlist/application/src/interfaces/IProductRepository";
import { Product } from "@magwishlist/core/src/entities/Product";
import { Money } from "@magwishlist/core/src/value-objects/Money";
import { PrismaClient } from "@prisma/client";
import { Product as PrismaProduct } from "@magwishlist/infrastructure/prisma";

export class ProductPrismaRepository implements IProductRepository {
  constructor(private readonly prisma: PrismaClient) {}

  async findById(id: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      return null;
    }

    return Product.create({
      name: product.name,
      description: product.description,
      price: Money.create(product.price, product.currency as any),
      sku: product.sku,
      isActive: product.isActive,
    });
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany();
    return products.map((product: PrismaProduct) =>
      Product.create({
        name: product.name,
        description: product.description,
        price: Money.create(product.price, product.currency as any),
        sku: product.sku,
        isActive: product.isActive,
      }),
    );
  }

  async findBySku(sku: string): Promise<Product | null> {
    const product = await this.prisma.product.findUnique({
      where: { sku },
    });

    if (!product) {
      return null;
    }

    return Product.create({
      name: product.name,
      description: product.description,
      price: Money.create(product.price, product.currency as any),
      sku: product.sku,
      isActive: product.isActive,
    });
  }

  async findActive(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      where: { isActive: true },
    });

    return products.map((product: PrismaProduct) =>
      Product.create({
        name: product.name,
        description: product.description,
        price: Money.create(product.price, product.currency as any),
        sku: product.sku,
        isActive: product.isActive,
      }),
    );
  }

  async save(product: Product): Promise<void> {
    await this.prisma.product.upsert({
      where: { id: product.id.value },
      create: {
        id: product.id.value,
        name: product.name,
        description: product.description,
        price: product.price.amount,
        currency: product.price.currency,
        sku: product.sku,
        isActive: product.isActive,
        createdAt: product.createdAt,
        updatedAt: product.updatedAt,
      },
      update: {
        name: product.name,
        description: product.description,
        price: product.price.amount,
        currency: product.price.currency,
        sku: product.sku,
        isActive: product.isActive,
        updatedAt: product.updatedAt,
      },
    });
  }

  async delete(id: string): Promise<void> {
    await this.prisma.product.delete({
      where: { id },
    });
  }
}
