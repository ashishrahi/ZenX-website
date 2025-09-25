import React from "react";
import { useCart } from "@/context/CartContext";
import { useCreateOrder } from "@/hooks/Orders/useAddOrder";
import { useNavigate } from "react-router-dom";
import Container from "@/components/Container";
import DeliveryForm from "@/components/DeliveryForm";
import OrderSummary from "@/components/OrderSummary";

const CheckoutPage = () => {
  const { cart, clearCart } = useCart();
  const { mutate: createOrder, isLoading } = useCreateOrder();
  const navigate = useNavigate();

  const handleSubmit = (values: any) => {
    if (!cart?.length) return alert("Cart is empty!");

    const orderPayload = {
      userId: "68d2aaa6b171048c9c8b0c1d", // get from auth context / JWT
      products: cart.map((item) => ({
        product: item._id,
        quantity: item.quantity,
        price: item.price,
      })),
      shippingAddress: {
        address: values.address,
        city: values.city,
        postalCode: values.pin,
        country: values.country || "India",
      },
      paymentMethod: values.paymentMethod || "Cash on Delivery",
      taxPrice: 0,
      shippingPrice: 0,
      totalPrice: cart.reduce((acc, item) => acc + item.price * item.quantity, 0),
    };

    createOrder(orderPayload, {
      onSuccess: () => {
        clearCart(); // Clear cart after order success
        navigate("/order-confirmation"); // Redirect to confirmation page
      },
      onError: (err) => {
        console.error("Order creation failed:", err);
      },
    });
  };

  return (
    <Container>
      <div className="grid grid-cols-1 my-16 lg:grid-cols-2 gap-12 items-center justify-items-center">
        <div className="w-full flex justify-center">
          <DeliveryForm onSubmit={handleSubmit} isSubmitting={isLoading} />
        </div>
        <div className="w-full flex justify-center">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
