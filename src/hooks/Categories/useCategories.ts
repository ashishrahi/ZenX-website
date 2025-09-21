"use client"

import { useQuery } from "@tanstack/react-query";
import { CategoryService } from "@/services/categoryService";
import { Category } from "@/types/ICategories";

export const useCategories = () => {
  return useQuery<Category[], Error>({
    queryKey: ["categories"], 
    queryFn: CategoryService.getAll, 
    staleTime: 1000 * 60 * 5, 
  });
};
