import React from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface CartModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  removeItem: (id: number) => void;
}

const CartModal: React.FC<CartModalProps> = ({ isOpen, onClose, cartItems, removeItem }) => {
  return (
    <div
      className={`fixed top-1/2 right-0 transform -translate-y-1/2 transition-transform duration-300 ease-in-out z-50 w-96 bg-white shadow-2xl rounded-l-2xl overflow-hidden ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
      style={{ height: "600px" }}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b border-gray-200 bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Your Cart</h2>
        <Button variant="ghost" className="p-2" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      {/* Cart Items */}
      <div className="p-5 overflow-y-auto h-[calc(100%-140px)] space-y-4">
        {cartItems.length === 0 ? (
          <p className="text-gray-400 text-sm text-center mt-10">
            Your cart is empty.
          </p>
        ) : (
          cartItems.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg shadow-sm"
            >
              <div className="flex items-center space-x-4">
                {item.image && (
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-16 h-16 object-cover rounded-lg"
                  />
                )}
                <div className="flex flex-col">
                  <p className="font-medium text-gray-800">{item.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
                  <p className="text-sm font-semibold text-gray-900">
                    ₹{item.price * item.quantity}
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                className="text-red-500 hover:bg-red-50"
                onClick={() => removeItem(item.id)}
              >
                Remove
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cartItems.length > 0 && (
        <div className="p-5 border-t border-gray-200 bg-gray-50">
          <p className="text-lg font-bold text-gray-900">
            Total: ₹{cartItems.reduce((acc, i) => acc + i.price * i.quantity, 0)}
          </p>
          <Button className="w-full mt-4 py-3 rounded-lg bg-gradient-to-r from-yellow-400 to-orange-500 text-white hover:from-yellow-500 hover:to-orange-600 transition-all">
            Checkout
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartModal;
