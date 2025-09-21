
export interface ProductImage {
  [key: string]: string; 
}

export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  images?: Record<string, string[]>; 
  colors?: string[];
  rating: number;
  gender?: string;
  tag?: string[];
  isBestseller?: boolean;
  bestseller?: boolean;
  inWishlist?: boolean; 
  category?:string;
  slug?:string

}


export interface AppCategoryProductsProps {
  productsData: Product[];
  title?: string;
  description?: string;
}


export interface ProductDetailsProps {
  product: Product;
  sizes?: string[];
  sizeGuide?: Record<string, { label: string; values: string[] }[]>;
}

export interface ProductCardProps {
  product: Product;
  basePath?: string;
  detailRoute?: string;
  price?: string;
  material?: string;
  care?: string;
}

export interface ProductCarouselProps {
  productsData: Product[];
  title?: string;
  description?: string;
  onWishlistToggle?: (product: Product) => void;
}