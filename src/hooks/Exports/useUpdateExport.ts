"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exportService } from "@/services/exportService";
import { IExport } from "@/types/IExport";

export const useUpdateExport = () => {
  const queryClient = useQueryClient();

  return useMutation<IExport, Error, IExport>({
    mutationFn: (updatedItem: IExport) => {
      const { id, ...data } = updatedItem;
      return exportService.update(id, data); // data is Partial<IExport>
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exportItems"] });
    },
  });
};
