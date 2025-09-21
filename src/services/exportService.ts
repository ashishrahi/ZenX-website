import axiosInstance from "@/lib/axios";
import { IExport } from "@/types/IExport";

export const ExportService = {
  getAll: async (): Promise<IExport[]> => {
    try {
      const { data } = await axiosInstance.get("/exports"); 
      return data?.data || [];
    } catch (error) {
      console.error("Failed to fetch Exports:", error);
      return [];
    }
  },
};
