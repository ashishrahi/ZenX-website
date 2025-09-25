// Represents a collection of product images
export interface ProductImages {
  [key: string]: string[]; // key could be 'thumbnail', 'gallery', etc.
}

// Core product interface
export interface Product {
  _id: string;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  images?: ProductImages;
  colors?: string[];
  rating: number;
  gender?: string;
  tags?: string[];
  isBestseller?: boolean;
  inWishlist?: boolean;
  category?: string;
  slug?: string;
}

// Props for displaying products under a category
export interface AppCategoryProductsProps {
  productsData: Product[];
  title?: string;
  description?: string;
}

// Props for detailed product page
export interface ProductDetailsProps {
  product: Product;
  sizes?: string[];
  sizeGuide?: Record<string, { label: string; values: string[] }[]>;
}

// Props for individual product card
export interface ProductCardProps extends Product {
  product: Product;
  basePath?: string;
  detailRoute?: string;
  material?: string;
  care?: string;
}

// Props for product carousel
export interface ProductCarouselProps {
  productsData: Product[];
  title?: string;
  description?: string;
  onWishlistToggle?: (product: Product) => void;
}
