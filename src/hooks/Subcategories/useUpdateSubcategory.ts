"use client"
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { SubcategoryService } from "@/services/subcategoryService";
import { ISubCategory } from "@/types/ISubcategoryTypes";

export const useUpdateSubcategory = () => {
  const queryClient = useQueryClient();

  return useMutation<ISubCategory, Error, ISubCategory>({
    mutationFn: (updatedSubcategory: ISubCategory) =>
      SubcategoryService.update(updatedSubcategory), // Pass only the subcategory object
    onSuccess: () => {
      // Refresh the subcategory list after successful update
      queryClient.invalidateQueries({ queryKey: ["subcategories"] });
    },
  });
};