const OrderSummary = ({ cart }: { cart: any[] }) => {
  const subtotal = cart.reduce((acc, item) => acc + item.price * item.quantity, 0);

  return (
    <div className="bg-gray-50 border rounded-lg p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Order Summary</h3>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex justify-between">
            <div>
              <p className="font-medium text-gray-900">{item.name}</p>
              <p className="text-sm text-gray-500">Qty: {item.quantity}</p>
            </div>
            <p className="font-semibold text-gray-900">₹{item.price * item.quantity}</p>
          </div>
        ))}
      </div>

      <hr className="my-6" />

      <div className="flex justify-between text-lg font-semibold text-gray-900">
        <span>Subtotal</span>
        <span>₹{subtotal}</span>
      </div>
      <p className="text-sm text-gray-500 mt-1">(Incl. of all taxes)</p>

      {/* Discount Code */}
      <div className="mt-6">
        <label className="block text-sm font-medium text-gray-700 mb-1">Discount Code</label>
        <div className="flex">
          <input
            type="text"
            placeholder="Enter code"
            className="border rounded-l-md px-3 py-2 flex-1 focus:ring-2 focus:ring-black outline-none"
          />
          <button className="px-4 py-2 bg-black text-white rounded-r-md hover:bg-gray-900 transition-colors">
            Apply
          </button>
        </div>
      </div>

      {/* Total */}
      <div className="mt-8 flex justify-between items-center text-xl font-bold text-gray-900">
        <span>Total</span>
        <span>₹{subtotal}</span>
      </div>
    </div>
  );
};

export default OrderSummary