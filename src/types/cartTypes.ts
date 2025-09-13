export interface Product {
  id: number;
  name: string;
  description?: string;
  price: number;
  discountPrice?: number;
  images: { [key: string]: string[] };
  colors?: string[];
  category?: string;
  trending?: boolean;
  bestSeller?: boolean;
}

export interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
}