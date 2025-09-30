import React from "react";
import { IOrderPayload } from "@/types/IOrderPayload";
import { Package, CheckCircle, XCircle, Clock } from "lucide-react";

interface OrdersProps {
  orders?: IOrderPayload[];
}

const Orders: React.FC<OrdersProps> = ({ orders = [] }) => {
  const getStatusIcon = (status?: string) => {
    switch (status?.toLowerCase()) {
      case "delivered":
        return <CheckCircle className="w-5 h-5 text-green-600" />;
      case "cancelled":
        return <XCircle className="w-5 h-5 text-red-600" />;
      case "shipped":
        return <Package className="w-5 h-5 text-blue-600" />;
      default:
        return <Clock className="w-5 h-5 text-yellow-600" />;
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "-";
    return new Date(dateString).toLocaleString("en-IN", {
      dateStyle: "short",
      timeStyle: "medium",
    });
  };

  return (
    <div className="w-full space-y-4">
      <h2 className="text-xl font-semibold mb-4">My Orders</h2>

      {orders.length === 0 ? (
        <p className="text-gray-500">No orders found for your account.</p>
      ) : (
        orders.map((order) => {
          const totalItems = order.products?.reduce(
            (acc, item) => acc + (item?.quantity ?? 0),
            0
          ) ?? 0;

          return (
            <div
              key={order.orderId}
              className="border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow duration-200"
            >
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">
                  <span className="font-semibold">Order ID:</span> {order.orderId ?? "-"}
                </p>
                <div className="flex items-center space-x-2">
                  {getStatusIcon(order.status)}
                  <span className="capitalize text-sm">{order.status ?? "-"}</span>
                </div>
              </div>

              <div className="flex justify-between text-sm text-gray-600 mb-3">
                <span>{formatDate(order.createdAt)}</span>
                <span>{totalItems} items</span>
                <span className="font-semibold">₹{order.totalPrice ?? 0}</span>
              </div>

              <div className="flex flex-wrap gap-2">
                {order.products?.map((item, index) => (
                  <div
                    key={index}
                    className="border rounded-md px-3 py-1 text-sm bg-gray-50"
                  >
                    {item?.product?.name ?? `Item ${index + 1}`} x {item?.quantity ?? 0}
                  </div>
                )) ?? null}
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Orders;
