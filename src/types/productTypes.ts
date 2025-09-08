export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  images: { [key: string]: string[] };
  colors?: string[];
  trending?: boolean;
  bestSeller?: boolean;
  category?: string;
}
