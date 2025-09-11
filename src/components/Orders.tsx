import React from "react";
import { Package, CheckCircle, XCircle, Clock } from "lucide-react";

interface Order {
  id: string;
  date: string;
  itemsCount: number;
  total: number;
  status: "Pending" | "Shipped" | "Delivered" | "Cancelled";
}

const mockOrders: Order[] = [
  {
    id: "ORD123456",
    date: "2025-09-10",
    itemsCount: 3,
    total: 1499,
    status: "Delivered",
  },
  {
    id: "ORD123457",
    date: "2025-09-05",
    itemsCount: 1,
    total: 499,
    status: "Shipped",
  },
  {
    id: "ORD123458",
    date: "2025-09-01",
    itemsCount: 2,
    total: 999,
    status: "Pending",
  },
];

const statusIcon = (status: string) => {
  switch (status) {
    case "Delivered":
      return <CheckCircle className="text-green-500" />;
    case "Shipped":
      return <Package className="text-blue-500" />;
    case "Pending":
      return <Clock className="text-yellow-500" />;
    case "Cancelled":
      return <XCircle className="text-red-500" />;
    default:
      return <Package />;
  }
};

const Orders: React.FC = () => {
  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6">My Orders</h2>

      {mockOrders.length === 0 ? (
        <div className="text-center py-20">
          <svg
            width="150"
            height="150"
            viewBox="0 0 24 24"
            fill="none"
            className="mx-auto mb-4"
          >
            <rect x="3" y="3" width="18" height="14" stroke="#111827" strokeWidth="1.5" rx="2" />
            <path d="M7 8v6" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M12 8v6" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
            <path d="M17 8v6" stroke="#111827" strokeWidth="1.5" strokeLinecap="round" />
          </svg>
          <p className="text-gray-500 text-lg">You have no recent orders.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {mockOrders.map((order) => (
            <div
              key={order.id}
              className="border rounded-lg shadow-sm p-4 flex justify-between items-center hover:shadow-md transition"
            >
              <div className="flex items-center gap-4">
                <div className="bg-gray-100 p-2 rounded-full">{statusIcon(order.status)}</div>
                <div>
                  <p className="font-semibold">Order ID: {order.id}</p>
                  <p className="text-sm text-gray-500">{order.date}</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-500">{order.itemsCount} items</p>
                <p className="font-semibold">₹{order.total}</p>
                <p className="text-xs mt-1">{order.status}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Orders;
