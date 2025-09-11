import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import AccountSidebar from "../../components/AccountSidebar";
import Orders from "../../components/Orders";
import Wishlist from "../../components/Wishlist";
// import Addresses from "./Addresses";
import Help from "../../components/HelpSupport";

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [activeTab, setActiveTab] = useState("orders"); // default tab

  const handleLogout = () => {
    console.log("Logout clicked");
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders />;
      case "wishlist":
        return <Wishlist />;
      // case "addresses":
      //   return <Addresses />;
      case "help":
        return <Help />;
      default:
        return <Orders />;
    }
  };

  return (
    <div className="min-h-screen bg-white pt-24">
      <div className="max-w-7xl mx-auto px-4 lg:px-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
        <aside className="col-span-1">
          <AccountSidebar onLogout={handleLogout} onSelectTab={setActiveTab} />
        </aside>

        <main className="col-span-2 flex flex-col items-center justify-start">
          <div className="w-full">{renderContent()}</div>

          <div className="mt-6 text-xs text-gray-500">
            <p>Cart items: {cart.length}</p>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AccountPage;
