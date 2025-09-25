"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exportService } from "@/services/exportService"; // create this service

export const useDeleteExport = () => {
  const queryClient = useQueryClient();

  return useMutation<void, Error, string>({
    mutationFn: (id: string) => exportService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exportItems"] });
    },
  });
};
