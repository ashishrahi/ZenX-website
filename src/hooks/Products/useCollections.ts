import { useQuery } from "@tanstack/react-query";
import { ProductService } from "@/services/productService";
import { Product } from "@/types/IproductTypes";


// collection slug
export const useCollectionSlug = (slug: string) => {
  return useQuery<Product, Error>({ 
    queryKey: ["products", slug], 
    queryFn: () => ProductService.getByCollectionslug(slug), 
    enabled: !!slug,
    staleTime: 1000 * 60 * 5,
  });
};