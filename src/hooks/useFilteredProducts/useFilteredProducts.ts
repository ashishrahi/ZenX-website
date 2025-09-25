// src/hooks/useFilteredProducts.ts
import { Product } from "../../types/IproductTypes";

export const useFilteredProducts = (products: Product[] = []) => {
  const trendingProducts = products.filter(
    (product) => !product.tags?.includes("Premium")
  );

  const premiumProducts = products.filter(
    (product) => product.tags?.includes("Premium")
  );

  const essentialProducts = products.filter(
    (product) =>
      (product.category === "men-trunks" || product.category === "men-briefs") &&
      product.tags?.includes("Premium")
  );

  return { trendingProducts, premiumProducts, essentialProducts };
};
