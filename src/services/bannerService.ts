"use client";

import axiosInstance from "@/lib/axios";
import { IBanners } from "@/types/IBanners";

export const BannerService = {
  // Fetch all banners
  getAll: async (): Promise<IBanners[]> => {
    const response = await axiosInstance.get("/banners");
    return response?.data?.data; // backend returns { success, message, data }
  },

  // Fetch a single banner by ID
  getById: async (id: string): Promise<IBanners> => {
    const response = await axiosInstance.get(`/banners/${id}`);
    return response?.data?.data;
  },

  // Create a new banner
  create: async (banner: Omit<IBanners, "_id">): Promise<IBanners> => {
    const response = await axiosInstance.post("/banners/create", banner);
    return response?.data?.data;
  },

  // Update an existing banner
  update: async (banner: IBanners): Promise<IBanners> => {
    const response = await axiosInstance.put(`/banners/update/${banner._id}`, banner);
    return response?.data?.data;
  },

  // Delete a banner by ID
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/banners/delete/${id}`);
  },
};
