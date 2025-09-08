import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Zen-X-Logo-300x139-removebg-preview.webp";
import { navItems, navItemsScreen } from "@/api/navItemsData";
import TopBar from "./TopBar";

const letterContainerVariants = {
  rest: { transition: { staggerChildren: 0 } },
  hover: { transition: { staggerChildren: 0.05 } },
};

const letterVariants = {
  rest: { y: 0, opacity: 1 },
  hover: { y: -4, opacity: 1 },
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header className="fixed w-full top-0 z-50">
      <motion.div
        className={`w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white"}`}
        initial={false}
        animate={{ height: isScrolled ? "80px" : "auto" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* TopBar Component */}
        <AnimatePresence>
          {!isScrolled && <TopBar isScrolled={isScrolled} />}
        </AnimatePresence>

        {/* Main Header */}
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
          {/* Logo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          >
            <NavLink to="/" end aria-label="Go to Home">
              <motion.img
                src={Logo}
                alt="Logo"
                className="h-10 md:h-12 cursor-pointer transition-all duration-300"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              />
            </NavLink>
          </motion.div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-extralight">
            {navItemsScreen.map((item) => (
              <motion.div key={item.name} initial="rest" whileHover="hover" animate="rest">
                <NavLink
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `relative overflow-hidden ${isActive ? "text-red-600 font-medium" : "text-gray-800"}`
                  }
                >
                  <motion.span className="flex space-x-0.5" variants={letterContainerVariants}>
                    {item.name.split("").map((char, idx) => (
                      <motion.span
                        key={idx}
                        variants={letterVariants}
                        transition={{ duration: 0.12 }}
                        className="inline-block"
                      >
                        {char}
                      </motion.span>
                    ))}
                  </motion.span>
                </NavLink>
              </motion.div>
            ))}
          </nav>

          {/* More Options Icon */}
          <motion.button
            className="hidden md:block transition-colors text-gray-800"
            onClick={() => setIsOverlayOpen(true)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            initial={{ rotate: 0 }}
            animate={{ rotate: isOverlayOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <MoreVertical size={28} />
          </motion.button>

          {/* Mobile Menu Icon */}
          <button
            className="md:hidden transition-colors text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </motion.div>
    </header>
  );
};

export default Header;
