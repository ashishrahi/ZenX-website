import React from "react";
import { Link } from "react-router-dom";
import ShadowContainer from "./ShadowContainer";

const OrderConfirmation = () => {
  return ( 
    <ShadowContainer>
    <div className="flex flex-col items-center justify-center h-[60vh] text-center gap-6">
      <h1 className="text-3xl font-bold text-green-600">
        Order Confirmed!
      </h1>
      <p className="text-lg text-gray-700">
        Thank you for your purchase. Your order has been successfully placed.
      </p>
      <Link
        to="/"
        className="mt-4 px-6 py-3 bg-primary text-white rounded-lg hover:bg-sidebar-primary transition"
      >
        Continue Shopping
      </Link>
    </div>
    </ShadowContainer>
  );
};

export default OrderConfirmation;
