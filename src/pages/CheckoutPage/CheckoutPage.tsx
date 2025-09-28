import React from "react";
import { useCart } from "@/context/CartContext";
import { useCreateOrder } from "@/hooks/Orders/useAddOrder";
import { useNavigate } from "react-router-dom";
import Container from "@/components/Container";
import DeliveryForm from "@/components/DeliveryForm";
import OrderSummary from "@/components/OrderSummary";
import { useSelector } from "react-redux";
import { RootState } from "@/store/store";

// --- Types ---
interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

interface DeliveryFormValues {
  address: string;
  city: string;
  pin: string;
  country?: string;
  paymentMethod?: string;
}

interface CreateOrderResponse {
  success: boolean;
  message: string;
}

// --- Component ---
const CheckoutPage: React.FC = () => {
  const { cart, clearCart } = useCart();
  const { mutate: createOrder, isPending } = useCreateOrder(); // ✅ use isPending instead of isLoading
  const navigate = useNavigate();

  const user = useSelector((state: RootState) => state.auth.user);
  const userId = user?._id;

  const handleSubmit = (values: DeliveryFormValues) => {
    if (!cart || cart.length === 0) {
      alert("Cart is empty!");
      return;
    }

    if (!userId) {
      alert("User not found. Please log in.");
      return;
    }

    const orderPayload = {
      userId,
      products: cart.map((item: CartItem) => ({
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
      totalPrice: cart.reduce(
        (acc: number, item: CartItem) => acc + item.price * item.quantity,
        0
      ),
      status: "pending", // Required by IOrderPayload
    };

    createOrder(orderPayload, {
      onSuccess: (response: CreateOrderResponse) => {
        if (response.success === true) {
          clearCart();
          navigate("/order-confirmation");
        } else {
          alert(response.message || "Order creation failed!");
        }
      },
      onError: (err: unknown) => {
        console.error("Order creation failed:", err);
        alert("An error occurred while creating the order.");
      },
    });
  };

  return (
    <Container>
      <div className="grid grid-cols-1 my-16 lg:grid-cols-2 gap-12 items-center justify-items-center">
        <div className="w-full flex justify-center">
          <DeliveryForm onSubmit={handleSubmit} isSubmitting={isPending} />
        </div>
        <div className="w-full flex justify-center">
          <OrderSummary cart={cart} />
        </div>
      </div>
    </Container>
  );
};

export default CheckoutPage;
