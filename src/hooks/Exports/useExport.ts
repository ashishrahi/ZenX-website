"use client";
import { useQuery } from "@tanstack/react-query";
import { exportService } from "@/services/exportService"; // create this service
import { IExport } from "@/types/IExport"; // define this type

export const useExport = (id: string) => {
  return useQuery<IExport, Error>({
    queryKey: ["exportItem", id], // unique key for this export item
    queryFn: () => exportService.getById(id), // fetch single item by ID
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};
