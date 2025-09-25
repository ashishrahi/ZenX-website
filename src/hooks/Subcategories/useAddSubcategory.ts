"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubcategoryService } from "@/services/subcategoryService";
import { ISubCategory } from "@/types/ISubcategoryTypes";

export const useAddSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation<ISubCategory, Error, Omit<ISubCategory, "id">>({
    mutationFn: (newSubcategory) => SubcategoryService.create(newSubcategory),
    onSuccess: () => {
      // Invalidate the "subcategories" query so the list refreshes
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
  });
};
