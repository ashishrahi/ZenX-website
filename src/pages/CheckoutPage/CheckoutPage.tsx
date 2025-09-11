import DeliveryForm from "@/components/DeliveryForm";
import OrderSummary from "@/components/OrderSummary";
import { useCart } from "@/context/CartContext";

const CheckoutPage = () => {
  const { cart } = useCart();

  const handleSubmit = (values: any) => {
    console.log("Order placed with values:", values);
    // TODO: integrate payment gateway
  };

  return (
    <div className="max-w-7xl mx-auto p-6 grid grid-cols-1 my-16 lg:grid-cols-2 gap-12 items-center justify-items-center">
      {/* Delivery Form */}
      <div className="w-full flex justify-center">
        <DeliveryForm onSubmit={handleSubmit} />
      </div>

      {/* Order Summary */}
      <div className="w-full flex justify-center">
        <OrderSummary cart={cart} />
      </div>
    </div>
  );
};

export default CheckoutPage;
