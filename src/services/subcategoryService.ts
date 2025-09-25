"use client";
import axiosInstance from "@/lib/axios";
import { ISubCategory } from "@/types/ISubcategoryTypes";

export const SubcategoryService = {
  getAll: async (): Promise<ISubCategory[]> => {
    const { data } = await axiosInstance.get("/subcategories");
    return data?.data;
  },

  getById: async (id: string): Promise<ISubCategory> => {
    const { data } = await axiosInstance.get(`/subcategories/${id}`);
    return data?.data;
  },

  create: async (subcategory: Omit<ISubCategory, "_id">): Promise<ISubCategory> => {
    const { data } = await axiosInstance.post("/subcategories/create", subcategory);
    return data?.data;
  },

  update: async (subcategory: ISubCategory): Promise<ISubCategory> => {
    console.log("subcategory", subcategory._id)
    const { data } = await axiosInstance.put(`/subcategories/update/${subcategory._id}`, subcategory);
    return data?.data; // <-- ensure consistency
  },

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/subcategories/${id}`);
  },
};
