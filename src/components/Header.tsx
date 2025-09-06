import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Zen-X-Logo-300x139.png";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "Products", href: "#products" },
  { name: "Categories", href: "#categories" },
  { name: "About Us", href: "#about" },
  { name: "Contact", href: "#contact" },
];

const topBarMessages = [
  "Free Shipping on orders above ₹999!",
  "24/7 Customer Support for all our clients.",
  "Quality you can trust, since 1995.",
];

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Scroll behavior for sticky header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Auto-slide top bar messages
  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % topBarMessages.length);
    }, 4000); // every 4 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed w-full top-0 z-50">
      {/* Top Bar with dynamic messages */}
      <div className="bg-gray-900 text-white text-sm md:text-base">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col items-center">
          {/* Animated message */}
          <AnimatePresence mode="wait">
            <motion.div
              key={activeIndex}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.4 }}
              className="text-center font-medium"
            >
              {topBarMessages[activeIndex]}
            </motion.div>
          </AnimatePresence>

          {/* Three Dots Navigation */}
          <div className="flex space-x-2 mt-1">
            {topBarMessages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? "bg-yellow-500" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Header Section */}
      <div
        className={`transition-all duration-300 ${
          isScrolled ? "backdrop-blur-sm bg-white/30 shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
          {/* Logo */}
          <div className="flex items-center">
            <img src={Logo} alt="Logo" className="h-10 md:h-12" />
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-semibold text-gray-800">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="relative group overflow-hidden"
              >
                <span className="flex space-x-0.5">
                  {item.name.split("").map((char, idx) => (
                    <span
                      key={idx}
                      className="inline-block transition-colors duration-300 group-hover:text-yellow-600"
                    >
                      {char}
                    </span>
                  ))}
                </span>
                <span className="absolute bottom-0 left-0 w-0 h-[2px] bg-yellow-600 transition-all group-hover:w-full"></span>
              </a>
            ))}
          </nav>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-white/90 backdrop-blur-md shadow-lg">
            <nav className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-semibold text-gray-800 hover:text-yellow-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
