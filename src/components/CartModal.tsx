import { useNavigate } from "react-router-dom";
import { Button } from "./ui/button";
import { Trash2, X } from "lucide-react";
import { useCart } from "@/context/CartContext";

// Inside your CartModal component
const CartModal: React.FC<{ isOpen: boolean; onClose: () => void }> = ({ isOpen, onClose }) => {
  const { cart, removeItem } = useCart();
  const navigate = useNavigate();
  const total = cart.reduce((acc, i) => acc + i.price * i.quantity, 0);

  const handlePlaceOrder = () => {
    onClose(); // Close the cart modal
    navigate("/checkout"); // Redirect to checkout page
  };

  return (
    <div
      className={`fixed top-0 right-0 h-full w-[420px] bg-white shadow-2xl transition-transform duration-300 ease-in-out z-50 flex flex-col ${
        isOpen ? "translate-x-0" : "translate-x-full"
      }`}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-5 border-b bg-gray-50">
        <h2 className="text-lg font-semibold text-gray-800">Items in my bag</h2>
        <Button variant="ghost" size="icon" onClick={onClose}>
          <X size={20} />
        </Button>
      </div>

      {/* Cart Items */}
      <div className="flex-1 overflow-y-auto p-5 space-y-5">
        {cart.length === 0 ? (
          <p className="text-gray-400 text-center mt-20">Your cart is empty.</p>
        ) : (
          cart.map((item) => (
            <div key={item.id} className="flex items-start gap-4 border rounded-xl p-3 bg-white shadow-sm">
              {item.images?.Burgundy && (
                <img
                  src={item.images.Burgundy[0]}
                  alt={item.name}
                  className="w-20 h-20 object-cover rounded-lg border"
                />
              )}
              <div className="flex flex-col flex-1">
                <p className="font-medium text-gray-900">{item.name}</p>
                <div className="flex items-center gap-4 mt-1 text-sm text-gray-500">
                  {item.size && <span>Size: {item.size}</span>}
                  <span>Qty: {item.quantity}</span>
                </div>
                {item.styleCode && <span className="text-xs text-gray-400">Style: {item.styleCode}</span>}
                <p className="font-semibold text-gray-900 mt-1">₹{item.price * item.quantity}</p>
              </div>
              <Button
                variant="ghost"
                size="icon"
                className="text-red-500 hover:bg-red-50"
                onClick={() => removeItem(item.id)}
              >
                <Trash2 size={18} />
              </Button>
            </div>
          ))
        )}
      </div>

      {/* Footer */}
      {cart.length > 0 && (
        <div className="p-5 border-t bg-gray-50">
          <div className="flex justify-between text-lg font-semibold text-gray-900 mb-3">
            <span>Subtotal</span>
            <span>₹{total}</span>
          </div>
          <p className="text-sm text-gray-500 mb-2">(Incl. of all taxes)</p>
          <Button
            className="w-full py-3 rounded-lg bg-black text-white hover:bg-gray-900"
            onClick={handlePlaceOrder}
          >
            Place Order
          </Button>
        </div>
      )}
    </div>
  );
};

export default CartModal;
