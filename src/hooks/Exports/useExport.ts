"use client";

import { useQuery } from "@tanstack/react-query";
import { ExportService } from "@/services/exportService"; // your service for FAQs
import { IExport } from "@/types/IExport";

export const useExports = () => {
  return useQuery<IExport[], Error>({
    queryKey: ["exports"],
    queryFn: ExportService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // retry once on failure
    refetchOnWindowFocus: false, // optional
  });
};
