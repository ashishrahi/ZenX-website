import React from "react";
import { Box, Heart, MapPin, HelpCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import AccountProfile from "./AccountProfile";

interface AccountSidebarProps {
  onLogout: () => void;
  onSelectTab: (tab: string) => void;
  selectedTab: string;
}

const AccountSidebar: React.FC<AccountSidebarProps> = ({
  onLogout,
  onSelectTab,
  selectedTab,
}) => {
  // Store icon component, not rendered element
  const tabs = [
    { id: "orders", label: "My Orders", description: "Check your Order Status", Icon: Box },
    { id: "wishlist", label: "Wishlist", description: "Shop from your Wishlist", Icon: Heart },
    { id: "addresses", label: "Saved Address", description: "Saved addresses for effortless checkout", Icon: MapPin },
    { id: "help", label: "Help & Support", description: "", Icon: HelpCircle },
  ];

  return (
    <div className="bg-white border rounded-lg shadow-sm overflow-hidden flex flex-col">
      <AccountProfile />

      <div className="p-4 flex-1">
        <ul className="divide-y">
          {tabs.map((tab) => {
            const isActive = selectedTab === tab?.id;
            return (
              <li
                key={tab.id}
                onClick={() => onSelectTab(tab.id)}
                className={`py-4 px-3 cursor-pointer rounded transition-colors duration-200
                  ${isActive ? "bg-red-50 text-red-700 font-semibold" : "text-gray-700 hover:bg-gray-100"}
                `}
              >
                <div className="flex items-center gap-3">
                  <tab.Icon size={18} className={isActive ? "text-red-700" : "text-gray-500"} />
                  <div>
                    <p className="font-medium">{tab.label}</p>
                    {tab.description && <p className="text-xs text-gray-500">{tab.description}</p>}
                  </div>
                </div>
              </li>
            );
          })}
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
