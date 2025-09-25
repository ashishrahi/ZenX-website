// services/userService.ts
import axiosInstance from "@/lib/axios";
import { User } from "@/types/IuserTypes";

export const UserService = {
  // Fetch all users
  getAll: async (): Promise<User[]> => {
    const { data } = await axiosInstance.get("/users");
    return data;
  },

  // Fetch a single user by ID
  getById: async (id: string): Promise<User> => {
    const { data } = await axiosInstance.get(`/users/${id}`);
    return data;
  },

  // Create a new user
  create: async (user: Omit<User, "id">): Promise<User> => {
    const { data } = await axiosInstance.post("/users", user);
    return data;
  },

  // Update an existing user
  update: async (user: User): Promise<User> => {
    const { data } = await axiosInstance.put(`/users/${user._id}`, user);
    return data;
  },

  // Delete a user by ID
  delete: async (id: string): Promise<void> => {
    await axiosInstance.delete(`/users/${id}`);
  },
};
