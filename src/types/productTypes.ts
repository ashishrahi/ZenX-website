// src/types/Product.ts
export interface ProductImage {
  [key: string]: string; // e.g., { "Burgundy": "url", "Black": "url" }
}

export interface Product {
  id: number;
  name: string;
  images: ProductImage;
  tag?: string[];
  price?: number;
  discountPrice?: number;
  rating?: number;
  category?: string;
  trending?: boolean;
  bestSeller?: boolean;
}
