import { SizeRange } from "./ISizeRange";

export interface Product {
  id: number;
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
}

export interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
}

export interface CartItem extends Product {
  quantity: number;
  size: SizeRange;      
  selectedColor: string;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}
