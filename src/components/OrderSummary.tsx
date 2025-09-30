import { CartItem } from "@/types/IcartTypes";

interface OrderSummaryProps {
  cart?: CartItem[];
  className?: string;
}

const OrderSummary: React.FC<OrderSummaryProps> = ({ cart, className = "" }) => {
  const subtotal = cart?.reduce(
    (acc, item) => acc + (item?.price ?? 0) * (item?.quantity ?? 0),
    0
  ) ?? 0;

  const shippingFee = subtotal > 1000 ? 0 : 99;
  const discount = subtotal > 2000 ? subtotal * 0.1 : 0; // 10% discount above 2000
  const taxes = subtotal * 0.18; // 18% GST
  const total = subtotal - discount + shippingFee + taxes;

  return (
    <div className={`bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden ${className}`}>
      {/* Header */}
      <div className="bg-gradient-to-r from-gray-900 to-gray-800 px-6 py-4">
        <h3 className="text-xl font-semibold text-white">Order Summary</h3>
      </div>

      <div className="p-6">
        {/* Cart Items */}
        <div className="space-y-4 mb-6">
          {cart?.map((item) => (
            <div key={item?.id} className="flex items-center justify-between group">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                  <span className="text-lg font-medium text-gray-600">
                    {item?.name?.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="font-medium text-gray-900">{item?.name}</p>
                  <p className="text-sm text-gray-500">Qty: {item?.quantity}</p>
                </div>
              </div>
              <p className="font-semibold text-gray-900">
                ₹{((item?.price ?? 0) * (item?.quantity ?? 0)).toLocaleString()}
              </p>
            </div>
          ))}
        </div>

        {/* Divider */}
        <div className="border-t border-gray-200 my-6" />

        {/* Pricing Breakdown */}
        <div className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Subtotal</span>
            <span className="font-medium text-gray-900">₹{subtotal.toLocaleString()}</span>
          </div>

          {discount > 0 && (
            <div className="flex justify-between text-sm">
              <span className="text-green-600">Discount (10%)</span>
              <span className="font-medium text-green-600">-₹{discount.toLocaleString()}</span>
            </div>
          )}

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Shipping</span>
            <span className="font-medium text-gray-900">
              {shippingFee === 0 ? (
                <span className="text-green-600">Free</span>
              ) : (
                `₹${shippingFee}`
              )}
            </span>
          </div>

          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Taxes (GST 18%)</span>
            <span className="font-medium text-gray-900">₹{taxes.toLocaleString()}</span>
          </div>

          {/* Total */}
          <div className="border-t border-gray-200 pt-3 mt-3">
            <div className="flex justify-between text-lg font-semibold">
              <span className="text-gray-900">Total</span>
              <span className="text-gray-900">₹{total.toLocaleString()}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 text-right">
              {shippingFee === 0 ? "Free shipping applied" : "Add ₹" + (1000 - subtotal) + " for free shipping"}
            </p>
          </div>
        </div>

        {/* Promo Code (Optional) */}
        <div className="mt-6">
          <div className="flex space-x-2">
            <input
              type="text"
              placeholder="Promo code"
              className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <button className="px-4 py-2 bg-gray-900 text-white text-sm font-medium rounded-lg hover:bg-gray-800 transition-colors">
              Apply
            </button>
          </div>
        </div>

        {/* Secure Checkout Note */}
        <div className="mt-6 flex items-center justify-center space-x-2 text-xs text-gray-500">
          <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
          <span>Secure checkout • 100% guaranteed</span>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;