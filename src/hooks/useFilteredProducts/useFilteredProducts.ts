// src/hooks/useFilteredProducts.ts
import { Product } from "../../types/productTypes"

export const useFilteredProducts = (products: Product[]) => {
const trendingProducts = products.filter(
  (product) => !(product.tag?.includes("Premium"))
);
  const premiumProducts = products.filter(p => p.tag?.includes("Premium"));
  const essentialProducts = products.filter(
    p => (p.category === "men-trunks" || p.category === "men-briefs") &&
         p.tag?.includes("Premium")
  );

  return { trendingProducts, premiumProducts, essentialProducts };
};
