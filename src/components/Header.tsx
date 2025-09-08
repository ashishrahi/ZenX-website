import { useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import {
  Menu,
  X,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Factory,
  MoreVertical,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Zen-X-Logo-300x139-removebg-preview.webp";
import { topBarMessages } from '../api/headerData';
import { navItems, navItemsScreen } from "@/api/navItemsData";

const overlayNavVariants = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: (i: number) => ({
    opacity: 1,
    rotateY: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const letterContainerVariants = {
  rest: { transition: { staggerChildren: 0 } },
  hover: { transition: { staggerChildren: 0.05 } },
};

const letterVariants = {
  rest: { y: 0, opacity: 1 },
  hover: { y: -4, opacity: 1 },
};

const Header = () => {
  const location = useLocation();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % topBarMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  // (Optional) temporary debug — remove or comment out later
  // console.log("location.pathname", location.pathname);

  return (
    <header className="fixed w-full top-0 z-50">
      <motion.div
        className={`w-full transition-all duration-300 ${isScrolled ? "bg-white shadow-md" : "bg-white"}`}
        initial={false}
        animate={{ height: isScrolled ? "80px" : "auto" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              key="top-bar"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-gray-100 shadow-sm text-red-600 text-sm md:text-base overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-1 flex flex-col items-center">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeIndex}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 10 }}
                    transition={{ duration: 0.4 }}
                    className="text-center font-extralight"
                  >
                    {topBarMessages[activeIndex]}
                  </motion.div>
                </AnimatePresence>

                <div className="flex space-x-1.5 mt-0.5">
                  {topBarMessages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${
                        index === activeIndex ? "bg-red-500" : "bg-gray-400"
                      }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
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
                  end={item.path === "/"} // exact for root only
                  className={({ isActive }) =>
                    `relative overflow-hidden ${isActive ? "text-red-600 font-medium" : "text-gray-800"}`
                  }
                >
                  <motion.span
                    className="flex space-x-0.5"
                    variants={letterContainerVariants}
                  >
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

          <button
            className="md:hidden transition-colors text-gray-800"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown */}
        {isMenuOpen && (
          <div className="md:hidden bg-white backdrop-blur-md shadow-lg border-t border-gray-200">
            <nav className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => (
                <NavLink
                  key={item.name}
                  to={item.path}
                  end={item.path === "/"}
                  className={({ isActive }) =>
                    `font-extralight px-4 py-2 rounded-md transition-colors ${
                      isActive
                        ? "bg-red-100 text-red-600 font-medium"
                        : "text-gray-800 hover:bg-gray-100 hover:text-red-600"
                    }`
                  }
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </NavLink>
              ))}
            </nav>
          </div>
        )}
      </motion.div>

      {/* overlay omitted for brevity — keep the same approach there (use NavLink and avoid color variants) */}
    </header>
  );
};

export default Header;
