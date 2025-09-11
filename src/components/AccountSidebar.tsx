import React from "react";
import { Box, Heart, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountProfile from "./AccountProfile";

interface AccountSidebarProps {
  onLogout: () => void;
  onSelectTab: (tab: string) => void;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({ onLogout, onSelectTab }) => {
  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col">
      <AccountProfile />

      <div className="p-4 flex-1">
        <ul className="divide-y">
          <li className="py-4 cursor-pointer" onClick={() => onSelectTab("orders")}>
            <div className="flex items-center gap-3">
              <Box size={18} />
              <div>
                <p className="font-medium">My Orders</p>
                <p className="text-xs text-gray-500">Check your Order Status</p>
              </div>
            </div>
          </li>

          <li className="py-4 cursor-pointer" onClick={() => onSelectTab("wishlist")}>
            <div className="flex items-center gap-3">
              <Heart size={18} />
              <div>
                <p className="font-medium">Wishlist</p>
                <p className="text-xs text-gray-500">Shop from your Wishlist</p>
              </div>
            </div>
          </li>

          <li className="py-4 cursor-pointer" onClick={() => onSelectTab("addresses")}>
            <div className="flex items-center gap-3">
              <MapPin size={18} />
              <div>
                <p className="font-medium">Saved Address</p>
                <p className="text-xs text-gray-500">Saved addresses for effortless checkout</p>
              </div>
            </div>
          </li>

          <li className="py-4 cursor-pointer" onClick={() => onSelectTab("help")}>
            <div className="flex items-center gap-3">
              <p className="text-sm font-medium">Help & Support</p>
            </div>
          </li>
        </ul>

        <div className="mt-6">
          <Button variant="outline" className="w-full" onClick={onLogout}>
            Log out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AccountSidebar;
