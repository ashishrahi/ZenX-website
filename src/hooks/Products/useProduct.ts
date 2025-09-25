import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/productService";
import { Product } from "@/types/IproductTypes";

export const useProduct = (slug: string) => {
  return useQuery<Product, Error>({
    queryKey: ["product", slug],      // <-- use slug in key
    queryFn: () => ProductService.getByslug(slug), // <-- fetch function
    staleTime: 1000 * 60 * 5,         // optional: 5 min cache
  });
};
