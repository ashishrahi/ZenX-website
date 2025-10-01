// services/productService.ts
import axiosInstance from "@/lib/axios";
import { Product } from "@/types/IproductTypes";

export const ProductService = {
  // get
  getAll: async (): Promise<Product[]> => {
    const { data } = await axiosInstance.get("/products");
    return data?.data;
  },
// get by slug
 getByslug: async (slug: string): Promise<Product> => {
  const { data } = await axiosInstance.get(`/products/${slug}`);
  return data?.data; // now data is already a single object
},

// / get by slug
 getByCollectionslug: async (slug: string): Promise<Product> => {
  const response = await axiosInstance.get(`/products/collections/${slug}`);
  return response?.data.data; 
},

  // get
  create: async (product: Omit<Product, "id">): Promise<Product> => {
    const { data } = await axiosInstance.post("/products/create", product);
    return data?.data;
  },
// update
  update: async (product: Product): Promise<Product> => {
    const { data } = await axiosInstance.put(`/products/update/${product._id}`, product);
    return data?.data;
  },
// delete

  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/products/delete/${id}`);
  },
};
