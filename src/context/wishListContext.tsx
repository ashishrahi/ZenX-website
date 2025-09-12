import React, { createContext, useContext, useState, ReactNode } from "react";

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

interface WishlistContextType {
  wishlist: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (id: number) => boolean;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) throw new Error("useWishlist must be used within WishlistProvider");
  return context;
};

export const WishlistProvider = ({ children }: { children: ReactNode }) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Add or remove product from wishlist
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      // Use optional chaining to safely access product.id
      if (prev.find((item) => item?.id === product?.id)) {
        return prev.filter((item) => item?.id !== product?.id);
      } else {
        return [...prev, product];
      }
    });
  };

  // Check if product is already in wishlist
  const isInWishlist = (id: number) => wishlist?.some((item) => item?.id === id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};
