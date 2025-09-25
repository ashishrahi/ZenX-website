"use client";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { exportService } from "@/services/exportService"; // create this service
import { IExport } from "@/types/IExport";

export const useAddExport = () => {
  const queryClient = useQueryClient();

  return useMutation<IExport, Error, Omit<IExport, "_id">>({
    mutationFn: (newItem) => exportService.create(newItem),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["exportItems"] });
    },
  });
};
