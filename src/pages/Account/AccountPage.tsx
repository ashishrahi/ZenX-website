import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import AccountSidebar from "../../components/AccountSidebar";
import Orders from "../../components/Orders";
import Wishlist from "../../components/Wishlist";
// import Addresses from "./Addresses";
import Help from "../../components/HelpSupport";
import AccountProfile from "@/components/AccountProfile";
import Container from "@/components/Container";
import ShadowContainer from "@/components/ShadowContainer";
import { Settings } from "lucide-react";
import ColoredTitle from "@/components/ColoredTitle";
import { useOrders } from "@/hooks/Orders";

const AccountPage: React.FC = () => {
  const navigate = useNavigate();
  const { cart } = useCart();
  const [activeTab, setActiveTab] = useState("orders"); // default tab
  const { data: orders } = useOrders();

  const handleLogout = () => {
    navigate("/");
  };

  const renderContent = () => {
    switch (activeTab) {
      case "orders":
        return <Orders orders={orders} />; // fixed prop name
      case "wishlist":
        return <Wishlist />;
      case "profile":
        return (
          <AccountProfile
            onSave={(data) => {
              console.log("Saved profile data:", data);
            }}
            onCancel={() => {
              console.log("Profile edit cancelled");
            }}
          />
        );
      case "help":
        return <Help />;
      default:
        return <Orders orders={orders} />; // default with proper prop
    }
  };

  return (
    <Container>
      <ShadowContainer>
        <div className="min-h-screen bg-white">
          {/* Page Title on Top */}
          <div className="max-w-7xl mx-auto px-4 lg:px-8 mb-20 flex flex-row justify-center items-center space-x-2">
            <Settings className="w-6 h-6 text-gray-700" />
            <h1 className="text-3xl font-semibold text-gray-800 text-center lg:text-left">
              <ColoredTitle title="Account Settings" />
            </h1>
          </div>

          {/* Main Layout */}
          <div className="max-w-7xl mx-auto px-4 lg:px-8 flex flex-col lg:flex-row gap-8">
            {/* Sidebar */}
            <aside className="lg:w-1/3 w-full">
              <AccountSidebar
                onLogout={handleLogout}
                onSelectTab={setActiveTab}
                selectedTab={activeTab}
              />
            </aside>

            {/* Main Content */}
            <main className="lg:w-2/3 w-full flex flex-col items-center justify-start">
              {/* Tab Content */}
              <div className="w-full">{renderContent()}</div>

              {/* Cart Info */}
              <div className="mt-6 text-xs text-gray-500 text-center lg:text-left">
                <p>Cart items: {cart.length}</p>
              </div>
            </main>
          </div>
        </div>
      </ShadowContainer>
    </Container>
  );
};

export default AccountPage;
