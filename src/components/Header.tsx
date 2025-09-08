import { useState, useEffect } from "react";
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
import { topBarMessages } from '../api/headerData'
import { navItems, navItemsScreen } from "@/api/navItemsData";

// Overlay nav animation
const overlayNavVariants = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: (i) => ({
    opacity: 1,
    rotateY: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const navVariants = {
  hidden: { opacity: 0, y: -20 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.1, duration: 0.4 },
  }),
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  // Detect scroll for header transformation
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
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header className="fixed w-full top-0 z-50">
      {/* Main Header Container with smooth transformation */}
      <motion.div
        className={`w-full transition-all duration-300 ${isScrolled ? "bg-black shadow-md" : "bg-transparent"
          }`}
        initial={false}
        animate={{
          height: isScrolled ? "80px" : "auto",
        }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
      >
        {/* Top Bar - now part of the main header container */}
        <AnimatePresence>
          {!isScrolled && (
            <motion.div
              key="top-bar"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3, ease: "easeInOut" }}
              className="bg-white shadow-sm text-black-500 text-sm md:text-base overflow-hidden"
            >
              <div className="max-w-7xl mx-auto px-4 py-1 flex flex-col items-center">
                {/* Rotating Message */}
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

                {/* Dots indicator */}
                <div className="flex space-x-1.5 mt-0.5">
                  {topBarMessages.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setActiveIndex(index)}
                      className={`h-1.5 w-1.5 rounded-full transition-colors duration-300 ${index === activeIndex ? "bg-red-500" : "bg-gray-400"
                        }`}
                    />
                  ))}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Navigation Section */}
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
          <motion.img
            src={Logo}
            alt="Logo"
            className={`h-10 md:h-12 transition-all duration-300 ${isScrolled ? "invert brightness-0" : ""
              }`}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-extralight">
            {navItemsScreen.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                initial="rest"
                whileHover="hover"
                animate="rest"
                className={`relative overflow-hidden ${isScrolled ? "text-white" : "text-gray-800"
                  }`}
              >
                <motion.span
                  className="flex space-x-0.5"
                  variants={{
                    rest: { transition: { staggerChildren: 0 } },
                    hover: { transition: { staggerChildren: 0.05 } },
                  }}
                >
                  {item.name.split("").map((char, idx) => (
                    <motion.span
                      key={idx}
                      variants={{
                        rest: { color: isScrolled ? "#fff" : "#1f2937" },
                        hover: { color: "#ef4444" },
                      }}
                      transition={{ duration: 0.15 }}
                    >
                      {char}
                    </motion.span>
                  ))}
                </motion.span>
              </motion.a>
            ))}
          </nav>

          {/* Overlay Trigger */}
          <motion.button
            className={`hidden md:block transition-colors ${isScrolled ? "text-white" : "text-gray-800"
              }`}
            onClick={() => setIsOverlayOpen(true)}
            whileTap={{ scale: 0.9 }}
            whileHover={{ scale: 1.1 }}
            initial={{ rotate: 0 }}
            animate={{ rotate: isOverlayOpen ? 90 : 0 }}
            transition={{ type: "spring", stiffness: 300, damping: 20 }}
          >
            <MoreVertical size={28} />
          </motion.button>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors ${isScrolled ? "text-white" : "text-gray-800"
              }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMenuOpen && (
          <div className="md:hidden bg-black/90 backdrop-blur-md shadow-lg">
            <nav className="flex flex-col space-y-4 p-6">
              {navItems.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="font-extralight text-white hover:text-red-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </motion.div>

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 text-white flex z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Left Section: Navigation */}
            <div className="w-1/2 p-8 flex flex-col justify-center space-y-6 border-r border-gray-700">
              <img src={Logo} alt="Logo" className="h-10 w-3/12 md:h-12" />
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={overlayNavVariants}
                  >
                    <a
                      href={item.href}
                      className="block text-lg tracking-wider hover:text-red-600 transition-colors"
                      onClick={() => setIsOverlayOpen(false)}
                    >
                      {item.name.toUpperCase()}
                    </a>
                    {index < navItems.length - 1 && (
                      <hr className="border-gray-700 my-3" />
                    )}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right Section: Contact Info */}
            <div className="w-1/2 p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-lg tracking-wider mb-6 font-extralight">
                  CONTACT US
                </h2>

                {/* Phone Numbers */}
                <div className="mb-6 space-y-2">
                  <p className="flex items-center space-x-2">
                    <Phone size={20} style={{ color: "red" }} />
                    <span>+91 94127 27706, +91 94127 27707</span>
                  </p>
                </div>

                {/* Email */}
                <div className="mb-6">
                  <p className="flex items-center space-x-2">
                    <Mail size={20} style={{ color: "red" }} />
                    <span>info@zenx.com</span>
                  </p>
                </div>

                {/* Corporate Office */}
                <div className="mb-6 flex flex-col gap-2">
                  <h3 className="font-extralight flex items-center space-x-2">
                    <MapPin size={20} style={{ color: "red" }} />
                    <span>Corporate Office</span>
                  </h3>
                  <p className="ml-6 font-extralight">
                    Zen-X PVT. LTD.
                    <br />
                    Mig-1/4 Mahabalipuram
                    <br />
                    Kalyanpur, Kanpur Nagar, 208017
                    <br />
                    26B/2k Dadanagar 208001, Kanpur, India
                  </p>
                </div>

                {/* Manufacturing Unit */}
                <div>
                  <h3 className="font-extralight flex items-center space-x-2">
                    <Factory size={20} style={{ color: "red" }} />
                    <span>Manufacturing Unit</span>
                  </h3>
                  <p className="ml-6 font-extralight">
                    Zen-X PVT. LTD.
                    <br />
                    Mig-1/4 Mahabalipuram
                    <br />
                    Kalyanpur, Kanpur Nagar, 208017
                    <br />
                    26B/2k Dadanagar 208001, Kanpur, India
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="text-lg tracking-wider mb-4 font-extralight">
                  FOLLOW US
                </h2>
                <div className="flex space-x-6">
                  <a href="#" className="hover:text-red-600 transition-colors">
                    <Facebook size={28} />
                  </a>
                  <a href="#" className="hover:text-red-600 transition-colors">
                    <Instagram size={28} />
                  </a>
                  <a href="#" className="hover:text-red-600 transition-colors">
                    <Linkedin size={28} />
                  </a>
                  <a href="#" className="hover:text-red-600 transition-colors">
                    <Youtube size={28} />
                  </a>
                </div>
              </div>
            </div>

            {/* Close Button */}
            <button
              onClick={() => setIsOverlayOpen(false)}
              className="absolute top-6 right-6"
            >
              <X size={32} className="text-white" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;