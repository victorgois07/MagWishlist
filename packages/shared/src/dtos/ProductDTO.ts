export interface MoneyDTO {
  amount: number;
  currency: string;
}

export interface ProductDTO {
  id: string;
  name: string;
  description: string;
  price: MoneyDTO;
  sku: string;
  isActive: boolean;
  createdAt: Date;
  updatedAt: Date;
}
