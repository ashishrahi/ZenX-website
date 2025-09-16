import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "../../services/apiClient";
import { endpoints } from "../../services/endpoints";
import { User } from "../../types/userTypes";

// Fetch all users
export function useUsers() {
  return useQuery<User[], Error>(["users"], () => apiClient.get(endpoints.users));
}

// Create a new user
export function useCreateUser() {
  const queryClient = useQueryClient();
  return useMutation(
    (newUser: Partial<User>) => apiClient.post(USERS, newUser),
    { onSuccess: () => queryClient.invalidateQueries(["users"]) }
  );
}

// Update user
export function useUpdateUser() {
  const queryClient = useQueryClient();
  return useMutation(
    ({ id, data }: { id: string; data: Partial<User> }) =>
      apiClient.put(`${USERS}/${id}`, data),
    { onSuccess: () => queryClient.invalidateQueries(["users"]) }
  );
}

// Delete user
export function useDeleteUser() {
  const queryClient = useQueryClient();
  return useMutation((id: string) => apiClient.delete(`${USERS}/${id}`), {
    onSuccess: () => queryClient.invalidateQueries(["users"]),
  });
}
