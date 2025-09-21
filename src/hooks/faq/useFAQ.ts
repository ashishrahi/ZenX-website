"use client";

import { useQuery } from "@tanstack/react-query";
import { FAQService } from "@/services/faq"; // your service for FAQs
import { FAQItem } from "@/types/FAQItem";

export const useFAQs = () => {
  return useQuery<FAQItem[], Error>({
    queryKey: ["faqs"],
    queryFn: FAQService.getAll,
    staleTime: 1000 * 60 * 5, // 5 minutes
    retry: 1, // retry once on failure
    refetchOnWindowFocus: false, // optional
  });
};
