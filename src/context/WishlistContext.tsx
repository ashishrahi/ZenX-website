// src/context/WishlistContext.tsx
import React, { createContext, useContext, useState, ReactNode } from "react";
import { Product, WishlistContextType } from "../types/cartTypes";

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

interface WishlistProviderProps {
  children: ReactNode;
}

export const WishlistProvider = ({ children }: WishlistProviderProps) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // ✅ Toggle wishlist item
  const toggleWishlist = (product: Product) => {
    setWishlist((prev) => {
      if (prev.some((item) => item._id === product._id)) {
        // Remove if already in wishlist
        return prev.filter((item) => item._id !== product._id);
      }
      // Add if not in wishlist
      return [...prev, product];
    });
  };

  // ✅ Check if product is in wishlist
  const isInWishlist = (_id: string) => wishlist.some((item) => item._id === _id);

  return (
    <WishlistContext.Provider value={{ wishlist, toggleWishlist, isInWishlist }}>
      {children}
    </WishlistContext.Provider>
  );
};

// ✅ Custom hook for consuming the context
export const useWishlist = () => {
  const context = useContext(WishlistContext);
  if (!context) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};
