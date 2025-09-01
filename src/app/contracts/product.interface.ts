export interface ProductImage {
  id: number;
  url: string;
  altText?: string;
  sortOrder: number;
}

export interface Product {
  id: number;
  sku: string;
  name: string;
  description?: string;
  price: number;
  categoryId?: number;
  isActive: boolean;
  createdAt: string;
  images?: ProductImage[];
}
