export interface ProductImages {
  [key: string]: string[];
}

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
  material?: string;
  care?: string;
  delivery?: string;
  variants?: string[];
}

export interface AppCategoryProductsProps {
  productsData: Product[];
  title?: string;
  description?: string;
  onAddToBag?: (productId: string) => void; // optional callback
  onWishlistToggle?: (productId: string) => void;
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
    onAddToBag?: (productId: string) => void;         // optional callback
  onWishlistToggle?: (productId: string) => void;
   hovered?: boolean;
}

// Props for product carousel
export interface ProductCarouselProps {
  productsData: Product[];
  title?: string;
  description?: string;
  onWishlistToggle?: (product: Product) => void;
}
