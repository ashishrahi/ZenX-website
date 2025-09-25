"use client";

import { useMutation, useQueryClient, UseMutationResult } from "@tanstack/react-query";
import { EnquireService } from "@/services/enquireService";
import { IEnquire } from "@/types/IEnquireTypes";

// Create a custom type that includes isLoading
type ExtendedMutationResult<TData, TError, TVariables, TContext> = 
  UseMutationResult<TData, TError, TVariables, TContext> & {
    isLoading: boolean;
  };

export const useAddEnquire = (): ExtendedMutationResult<
  IEnquire,
  Error,
  Omit<IEnquire, "_id">,
  unknown
> => {
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (newEnquire: Omit<IEnquire, "_id">) =>
      EnquireService.create(newEnquire),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["enquires"] });
    },
  });

  // Cast the mutation to include isLoading
  return {
    ...mutation,
    isLoading: mutation.status === 'pending',
  } as ExtendedMutationResult<IEnquire, Error, Omit<IEnquire, "_id">, unknown>;
};