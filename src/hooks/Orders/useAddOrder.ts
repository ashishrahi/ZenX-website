import { useMutation, useQueryClient } from "@tanstack/react-query";
import { OrderService } from "@/services/orderService";
import { IOrderPayload } from "@/types/IOrderPayload";

export const useCreateOrder = () => {
  const queryClient = useQueryClient();

  return useMutation<IOrderPayload, Error, Omit<IOrderPayload, "id">>({
    mutationFn: (newOrder) => OrderService.create(newOrder),
    onSuccess: () => {
      // Invalidate queries to refresh order lists or dashboards
      queryClient.invalidateQueries({ queryKey: ["orders"] });
    },
  });
};
