"use client";

import { useQuery } from "@tanstack/react-query";
import { exportService } from "@/services/exportService"; // create this service
import { IExport } from "@/types/IExport";

export const useExports = () => {
  return useQuery<IExport[], Error>({
    queryKey: ["exportItems"], // unique query key
    queryFn: exportService.getAll, // fetch all export items from backend
    staleTime: 1000 * 60 * 5, // cache for 5 minutes
  });
};
