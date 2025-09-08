import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Menu,
  X,
  MoreVertical,
  Phone,
  Mail,
  MapPin,
  Factory,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
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

const overlayNavVariants = {
  hidden: { opacity: 0, rotateY: 90 },
  visible: (i: number) => ({
    opacity: 1,
    rotateY: 0,
    transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
  }),
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isOverlayOpen, setIsOverlayOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  // Detect scroll
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
        {/* TopBar */}
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

          {/* More Options Icon (Desktop Overlay) */}
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

          {/* Mobile Menu Button */}
          <button
            className="md:hidden transition-colors text-gray-800"
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
                <NavLink
                  key={item.name}
                  to={item.path}
                  className={({ isActive }) =>
                    `font-extralight text-white hover:text-red-600 transition-colors px-4 py-2 rounded-md ${
                      isActive ? "bg-red-600 text-white" : ""
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

      {/* Full Screen Overlay */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 text-white flex z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Left: Navigation */}
            <div className="w-1/2 p-8 flex flex-col justify-center space-y-6 border-r border-gray-700">
              <img src={Logo} alt="Logo" className="h-10 w-3/12 md:h-12 mb-6" />
              <div className="space-y-4">
                {navItems.map((item, index) => (
                  <motion.div
                    key={item.name}
                    custom={index}
                    initial="hidden"
                    animate="visible"
                    variants={overlayNavVariants}
                  >
                    <NavLink
                      to={item.path}
                      className={({ isActive }) =>
                        `block text-lg tracking-wider px-4 py-2 rounded-md transition-colors ${
                          isActive
                            ? "bg-red-600 text-white"
                            : "bg-white/10 hover:bg-white/20 text-white"
                        }`
                      }
                      onClick={() => setIsOverlayOpen(false)}
                    >
                      {item.name.toUpperCase()}
                    </NavLink>
                    {index < navItems.length - 1 && <hr className="border-gray-700 my-3" />}
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Right: Contact Info */}
            <div className="w-1/2 p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-lg tracking-wider mb-6 font-extralight">CONTACT US</h2>

                <div className="mb-6 space-y-2">
                  <p className="flex items-center space-x-2">
                    <Phone size={20} className="text-red-600" />
                    <span>+91 94127 27706, +91 94127 27707</span>
                  </p>
                </div>

                <div className="mb-6">
                  <p className="flex items-center space-x-2">
                    <Mail size={20} className="text-red-600" />
                    <span>info@zenx.com</span>
                  </p>
                </div>

                <div className="mb-6 flex flex-col gap-2">
                  <h3 className="font-extralight flex items-center space-x-2">
                    <MapPin size={20} className="text-red-600" />
                    <span>Corporate Office</span>
                  </h3>
                  <p className="ml-6 font-extralight">
                    Zen-X PVT. LTD.<br />
                    Mig-1/4 Mahabalipuram<br />
                    Kalyanpur, Kanpur Nagar, 208017<br />
                    26B/2k Dadanagar 208001, Kanpur, India
                  </p>
                </div>

                <div>
                  <h3 className="font-extralight flex items-center space-x-2">
                    <Factory size={20} className="text-red-600" />
                    <span>Manufacturing Unit</span>
                  </h3>
                  <p className="ml-6 font-extralight">
                    Zen-X PVT. LTD.<br />
                    Mig-1/4 Mahabalipuram<br />
                    Kalyanpur, Kanpur Nagar, 208017<br />
                    26B/2k Dadanagar 208001, Kanpur, India
                  </p>
                </div>
              </div>

              {/* Social Links */}
              <div>
                <h2 className="text-lg tracking-wider mb-4 font-extralight">FOLLOW US</h2>
                <div className="flex space-x-6">
                  <a href="#" className="hover:text-red-600 transition-colors"><Facebook size={28} /></a>
                  <a href="#" className="hover:text-red-600 transition-colors"><Instagram size={28} /></a>
                  <a href="#" className="hover:text-red-600 transition-colors"><Linkedin size={28} /></a>
                  <a href="#" className="hover:text-red-600 transition-colors"><Youtube size={28} /></a>
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
