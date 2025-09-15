// src/types/cartTypes.ts
export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  images?: Record<string, string[]>; // Example: { red: ["red1.jpg"], blue: ["blue1.jpg"] }
  colors?: string[];
  rating: number;
  gender?: string;
  tag?: string[];
  isBestseller?: boolean;
  bestseller?: boolean;
  inWishlist?: boolean; // Derived from context
}

export interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

export interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: number) => void;
}
