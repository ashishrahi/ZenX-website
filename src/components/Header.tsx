import { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { Search, Info, Heart, ShoppingBag, User, Menu, X } from "lucide-react";
import JockeyLogo from "../assets/Zen-X-Logo-300x139-removebg-preview.webp";
import { navLinks } from "../api/navItemsData";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IconButton } from "./IconButton";

const Header = () => {
  const [cartCount] = useState(0);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const iconClass = "p-2 rounded-full hover:text-current focus:text-current !hover:bg-transparent";
  const iconSize = 40; // Medium size icons

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-6">
            <Link to="/">
              <img src={JockeyLogo} alt="Jockey Logo" className="h-8 cursor-pointer" />
            </Link>
            <div className="relative flex items-center">
              <span className="absolute -top-2 -right-5 text-[10px] bg-yellow-400 text-black font-bold px-1 rounded">
                NEW
              </span>
            </div>
          </div>

          {/* Center Section - Navigation */}
          <nav className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `uppercase text-sm font-medium tracking-wide transition-colors ${isActive ? "text-black" : "text-gray-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* Right Section - Icons */}
          <div className="flex items-center space-x-5">
            {/* Search Bar */}
            <div className="relative hidden md:block">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500" size={18} />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 pl-10 pr-24 py-2 h-12 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition"
              />
            </div>

            {/* Info Button - Modal */}
            <Dialog>
              <DialogTrigger asChild>
                <IconButton>
                  <Info size={25} />  {/* 40px */}
                </IconButton>
              </DialogTrigger>

              <DialogContent className="sm:max-w-[900px] max-h-[90vh] overflow-y-auto rounded-lg p-6 transition-transform duration-300 ease-in-out">
                <DialogTitle className="text-2xl font-bold">Get in Touch</DialogTitle>

                {/* <DialogClose asChild>
                  <button className="absolute top-4 right-4 text-gray-500">
                    <X size={iconSize} />
                  </button>
                </DialogClose> */}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
                  {/* Corporate Office */}
                  <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <h3 className="font-semibold text-lg mb-2">Corporate Office</h3>
                    <p className="text-sm text-gray-700">
                      ZenX Industries Limited, Cessna Business Park, Umiya Business Bay-Tower-1,
                      7th Floor, Kanpur, Uttar Pradesh, India, 560103.
                    </p>
                    <p className="text-sm mt-2 font-medium">CIN: L18101KA1994PLC016554</p>
                    <p className="mt-2">
                      📧{" "}
                      <a href="mailto:wecare@ZenX.com" className="text-blue-600 hover:underline">
                        wecare@ZenX.com
                      </a>
                    </p>
                    <p className="mt-1">📞 1800-572-1299 / 1860-425-3333</p>
                    <p className="text-xs text-gray-500">(Mon-Sun, 10:00 AM - 7:00 PM)</p>
                  </div>

                  {/* Purchase Queries */}
                  <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <h3 className="font-semibold text-lg mb-2">For Purchase Related Queries</h3>
                    <p className="text-sm text-gray-700">
                      ZenX Industries Limited, Cessna Business Park, Umiya Business Bay-Tower-1,
                      3rd Floor, Kanpur, Uttar Pradesh, India, 560103.
                    </p>
                    <p className="text-sm mt-2 font-medium">CIN: L18101KA1994PLC016554</p>
                    <p className="mt-2">
                      📧{" "}
                      <a href="mailto:wecare@jockeyindia.com" className="text-blue-600 hover:underline">
                        wecare@jockeyindia.com
                      </a>
                    </p>
                    <p className="mt-1">📞 1800-572-1299 / 1860-425-3333</p>
                    <p className="text-xs text-gray-500">(Mon-Sun, 10:00 AM - 7:00 PM)</p>
                  </div>

                  {/* Franchisee */}
                  <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <h3 className="font-semibold text-lg mb-2">To Apply for: Franchisee (Exclusive Outlet)</h3>
                    <p className="mt-2">
                      📧{" "}
                      <a href="mailto:franchisee@ZenX.com" className="text-blue-600 hover:underline">
                        franchisee@ZenX.com
                      </a>
                    </p>
                    <p className="mt-1">📞 1800-572-1299</p>
                  </div>

                  {/* Distributorship */}
                  <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition">
                    <h3 className="font-semibold text-lg mb-2">To Apply for: Distributorship</h3>
                    <p className="mt-2">
                      📧{" "}
                      <a href="mailto:wecare@jockeyindia.com" className="text-blue-600 hover:underline">
                        wecare@ZenXindia.com
                      </a>
                    </p>
                    <p className="mt-1">📞 1800-572-1299</p>
                  </div>

                  {/* Grievance Officer */}
                  <div className="border rounded-lg p-4 shadow-sm hover:shadow-md transition md:col-span-2">
                    <h3 className="font-semibold text-lg mb-2">Grievance Officer</h3>
                    <p className="font-semibold">Ms. Meena Patel</p>
                    <p className="text-sm text-gray-700 mt-2">
                      Zen-X Industries Limited, Cessna Business Park, Umiya Business Bay-Tower-1,
                      3rd Floor, Kanpur, Uttar Pradesh, India, 560103.
                    </p>
                  </div>
                </div>
              </DialogContent>
            </Dialog>

            {/* Wishlist */}
             <IconButton>
              <Heart size={25} />
            </IconButton>

            {/* Cart */}
            <div className="relative">
              <IconButton>
                <ShoppingBag size={25} />
              </IconButton>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </div>

            {/* User */}
            <IconButton>
              <User size={25} />
            </IconButton>

            {/* Mobile Menu Toggle */}
            <Button
              variant="ghost"
              className={iconClass + " md:hidden"}
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={iconSize} /> : <Menu size={iconSize} />}
            </Button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md">
          <nav className="flex flex-col space-y-2 px-4 py-4">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                onClick={() => setMobileMenuOpen(false)}
                className={({ isActive }) =>
                  `uppercase text-sm font-medium tracking-wide transition-colors ${isActive ? "text-black" : "text-gray-400"
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>
          <div className="flex flex-col space-y-2 px-4 py-2">
            <input
              type="text"
              placeholder="Search"
              className="bg-gray-100 pl-3 pr-4 py-2 h-12 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition"
            />
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
