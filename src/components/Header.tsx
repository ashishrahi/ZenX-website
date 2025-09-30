import React, { useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { Search, Info, Heart, ShoppingBag, User, Menu, X, ChevronDown } from "lucide-react";
import JockeyLogo from "../assets/Zen-X-Logo-300x139-removebg-preview.webp";
import { navLinks } from "../api/navItemsData";
import { Button } from "@/components/ui/button";
import CartModal from "./CartModal";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import InfoModal from "./InfoModal";
import UserMenu from "./AppUserMenu";

// IconButton component
export const IconButton = React.forwardRef<
  HTMLButtonElement,
  { children: React.ReactNode; onClick?: () => void; className?: string }
>(({ children, onClick, className }, ref) => (
  <button
    ref={ref}
    type="button"
    onClick={onClick}
    className={`p-2 m-0 w-auto h-auto flex items-center justify-center bg-transparent rounded-full hover:bg-gray-100 transition-colors ${
      className ?? ""
    }`}
  >
    {children}
  </button>
));
IconButton.displayName = "IconButton";

interface CartItem {
  id: number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
}

const Header: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [cartOpen, setCartOpen] = useState(false);
  const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
  const navigate = useNavigate();
  const { cart } = useCart();
  const { wishlist } = useWishlist();

  const iconClass =
    "p-2 rounded-full hover:text-current focus:text-current !hover:bg-transparent";
  const iconSize = 40;

  const toggleMobileSubmenu = (name: string) => {
    if (activeSubmenu === name) {
      setActiveSubmenu(null);
    } else {
      setActiveSubmenu(name);
    }
  };

  return (
    <header className="w-full fixed top-0 left-0 z-50 bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left Section - Logo */}
          <div className="flex items-center space-x-6">
            
            <Link to="/">
              <img
                src={JockeyLogo}
                alt="ZenX Logo"
                className="h-14 cursor-pointer"
              />
            </Link>
            <div className="relative flex items-center">
              <span className="absolute -top-8 -right-1 text-[10px] bg-yellow-400 text-black font-bold px-1 rounded">
                NEW
              </span>
            </div>
          </div>

          {/* Center Section - Navigation */}
          <nav className="hidden md:flex space-x-8 relative">
            {navLinks.map((link) => (
              <div key={link.name} className="group relative py-6">
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    `uppercase text-sm font-medium tracking-wide transition-colors flex items-center ${
                      isActive ? "text-black" : "text-gray-400"
                    }`
                  }
                  onMouseEnter={() => setActiveSubmenu(link.name)}
                  onMouseLeave={() => setActiveSubmenu(null)}
                >
                  {link.name}
                  {link.subcategories && <ChevronDown size={16} className="ml-1" />}
                </NavLink>

                {/* Invisible hover area */}
                {link.subcategories && (
                  <div className="absolute left-0 right-0 h-4 bg-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                )}

                {/* Subcategory Dropdown */}
                {link.subcategories && (
                  <div 
                    className={`absolute left-0 top-full bg-white rounded-lg shadow-lg border-t mt-0 p-6 w-[800px] z-50 transition-all duration-300 ease-in-out ${
                      activeSubmenu === link.name 
                        ? "opacity-100 visible translate-y-0" 
                        : "opacity-0 invisible -translate-y-2"
                    }`}
                    onMouseEnter={() => setActiveSubmenu(link.name)}
                    onMouseLeave={() => setActiveSubmenu(null)}
                  >
                    <div className="grid grid-cols-4 gap-6">
                      {link.subcategories.map((sub, idx) => (
                        <div key={idx}>
                          <h3 className="font-semibold mb-3 text-sm">{sub.title}</h3>
                          <ul className="space-y-2">
                            {sub.items.map((item, i) => (
                              <li key={i}>
                                <Link
                                  to={`/collections/${item
                                    .toLowerCase()
                                    .replace(/\s+/g, "-")}`}
                                  className="text-gray-600 text-sm hover:text-black transition"
                                  onClick={() => setActiveSubmenu(null)}
                                >
                                  {item}
                                </Link>
                              </li>
                            ))}
                          </ul>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Right Section - Icons */}
          <div className="flex items-center space-x-5">
            {/* Search Bar */}
            <div className="relative hidden md:block ml-2">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 pl-10 pr-24 py-2 h-12 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition"
              />
            </div>

            {/* Info Modal */}
             <InfoModal open={dialogOpen} setOpen={setDialogOpen} />

            {/* Wishlist */}
            <div className="relative">
              <IconButton onClick={() => navigate("/account?tab=wishlist")}>
                <Heart size={25} />
              </IconButton>
              {wishlist.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-700 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {wishlist.length}
                </span>
              )}
            </div>

            {/* Cart */}
            <div className="relative">
              <IconButton onClick={() => setCartOpen(true)}>
                <ShoppingBag size={25} />
              </IconButton>
              {cart.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-black text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                  {cart.reduce((acc, i) => acc + (i.quantity || 1), 0)}
                </span>
              )}
            </div>

            {/* User */}
            <UserMenu />

            {/* Mobile Menu Toggle */}
            <Button
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
          <nav className="flex flex-col space-y-0 px-4 py-4">
            {navLinks.map((link) => (
              <div key={link.name}>
                <div 
                  className="flex items-center justify-between py-3"
                  onClick={() => {
                    if (link.subcategories) {
                      toggleMobileSubmenu(link.name);
                    } else {
                      navigate(link.path);
                      setMobileMenuOpen(false);
                    }
                  }}
                >
                  <span className="uppercase text-sm font-medium tracking-wide text-gray-400">
                    {link.name}
                  </span>
                  {link.subcategories && (
                    <ChevronDown 
                      size={16} 
                      className={`transform transition-transform ${activeSubmenu === link.name ? 'rotate-180' : ''}`}
                    />
                  )}
                </div>
                
                {/* Mobile Subcategories */}
                {link.subcategories && activeSubmenu === link.name && (
                  <div className="pl-4 pb-3">
                    {link.subcategories.map((sub, idx) => (
                      <div key={idx} className="mb-4">
                        <h3 className="font-semibold mb-2 text-sm">{sub.title}</h3>
                        <ul className="space-y-2">
                          {sub.items.map((item, i) => (
                            <li key={i}>
                              <Link
                                to={`/collections/${item
                                  .toLowerCase()
                                  .replace(/\s+/g, "-")}`}
                                className="text-gray-600 text-sm block py-1"
                                onClick={() => setMobileMenuOpen(false)}
                              >
                                {item}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </nav>
          <div className="flex flex-col space-y-2 px-4 py-2 border-t">
            <div className="relative">
              <Search
                className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
                size={18}
              />
              <input
                type="text"
                placeholder="Search"
                className="bg-gray-100 pl-10 pr-4 py-2 h-12 rounded-full text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 transition w-full"
              />
            </div>
          </div>
        </div>
      )}

      {/* Cart Modal */}
      <CartModal isOpen={cartOpen} onClose={() => setCartOpen(false)} />
    </header>
  );
};

export default Header;
