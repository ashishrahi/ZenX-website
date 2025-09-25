import axiosInstance from "@/lib/axios";
import { FAQItem } from "@/types/IFAQItem";

export const FAQService = {
  getAll: async (): Promise<FAQItem[]> => {
    try {
      const { data } = await axiosInstance.get("/faq"); 
      return data?.data || [];
    } catch (error) {
      console.error("Failed to fetch FAQs:", error);
      return [];
    }
  },
};
