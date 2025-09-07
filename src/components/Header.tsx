import { useState, useEffect } from "react";
import {
  Menu,
  X,
  MoreHorizontal,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Phone,
  Mail,
  MapPin,
  Factory,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Logo from "../assets/Zen-X-Logo-300x139.png";

const navItems = [
  { name: "Home", href: "#home" },
  { name: "About Us", href: "#about" },
  { name: "TRUNKS", href: "#trunks" },
  { name: "GYM WESTS", href: "#gymwest" },
  { name: "KIDS WEAR", href: "#kidswear" },
  { name: "WINTER WEAR", href: "#winterwear" },
  { name: "Our Quality", href: "#quality" },
  { name: "Media", href: "#media" },
  { name: "ESG", href: "#esg" },
  { name: "Downloads", href: "#downloads" },
  { name: "Contact Us", href: "#contact" },
];

const navItemsScreen = [
  { name: "TRUNKS", href: "#home" },
  { name: "GYM WESTS", href: "#about" },
  { name: "KIDS WEAR", href: "#kidswear" },
  { name: "WINTER WEAR", href: "#winterwear" },
];

const topBarMessages = [
  "Free Shipping on orders above ₹999!",
  "24/7 Customer Support for all our clients.",
  "Quality you can trust, since 1995.",
];

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

  // Sticky header
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
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
      {/* Top Bar */}
      <div className="bg-red-500 text-white text-sm md:text-base">
        <div className="max-w-7xl mx-auto px-4 py-2 flex flex-col items-center">
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
          <div className="flex space-x-2 mt-1">
            {topBarMessages.map((_, index) => (
              <button
                key={index}
                onClick={() => setActiveIndex(index)}
                className={`h-2 w-2 rounded-full transition-colors duration-300 ${
                  index === activeIndex ? "bg-white" : "bg-gray-400"
                }`}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div
        className={`transition-all duration-300 ${
          isScrolled ? "bg-black shadow-md" : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between p-4 md:p-6">
          <img src={Logo} alt="Logo" className="h-10 md:h-12" />

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8 font-semibold">
            {navItemsScreen.map((item, index) => (
              <motion.a
                key={item.name}
                href={item.href}
                custom={index}
                initial="hidden"
                animate="visible"
                variants={navVariants}
                className={`relative group overflow-hidden transition-colors duration-300 ${
                  isScrolled ? "text-white" : "text-gray-800"
                }`}
              >
                <span className="flex space-x-1">
                  {item.name.split("").map((char, idx) => (
                    <span
                      key={idx}
                      className="inline-block transition-colors duration-300 group-hover:text-red-600"
                    >
                      {char}
                    </span>
                  ))}
                </span>
              </motion.a>
            ))}
          </nav>

          {/* Overlay Trigger */}
          <button
            className={`hidden md:block transition-colors ${
              isScrolled ? "text-white" : "text-gray-800"
            }`}
            onClick={() => setIsOverlayOpen(true)}
          >
            <MoreHorizontal size={28} />
          </button>

          {/* Mobile Menu Button */}
          <button
            className={`md:hidden transition-colors ${
              isScrolled ? "text-white" : "text-gray-800"
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
                  className="font-semibold text-white hover:text-red-600 transition-colors"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {item.name}
                </a>
              ))}
            </nav>
          </div>
        )}
      </div>

      {/* FULL SCREEN OVERLAY */}
      <AnimatePresence>
        {isOverlayOpen && (
          <motion.div
            className="fixed inset-0 bg-black/95 text-white flex z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            {/* Left Section: Navigation with Rotation */}
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

            {/* Right Section: Contact Info with Icons */}
            <div className="w-1/2 p-10 flex flex-col justify-between">
              <div>
                <h2 className="text-lg tracking-wider mb-6">CONTACT US</h2>

                {/* Phone Numbers */}
                <div className="mb-6 space-y-2">
                  <p className="flex items-center space-x-2">
                    <Phone size={20} style={{color:"red"}}/> <span>+91 94127 27706, +91 94127 27707</span>
                  </p>
                 
                </div>

                {/* Email */}
                <div className="mb-6">
                  <p className="flex items-center space-x-2 ">
                    <Mail size={20} style={{color:"red"}} /> <span>info@zenx.com</span>
                  </p>
                </div>

                {/* Corporate Office */}
                <div className="mb-6">
                  <h3 className="font-semibold flex items-center space-x-2">
                    <MapPin size={20} style={{color:"red"}} /> <span>Corporate Office</span>
                  </h3>
                  <p className="ml-6">
                    Zen-X PVT. LTD.<br />
                    Mig-1/4 Mahabalipuram<br />
                    Kalyanpur, Kanpur Nagar, 208017<br />
                    26B/2k Dadanagar 208001, Kanpur, India
                  </p>
                </div>

                {/* Manufacturing Unit */}
                <div>
                  <h3 className="font-semibold flex items-center space-x-2">
                    <Factory size={20} style={{color:"red"}}/> <span>Manufacturing Unit</span>
                  </h3>
                  <p className="ml-6">
                    Zen-X PVT. LTD.<br />
                    Mig-1/4 Mahabalipuram<br />
                    Kalyanpur, Kanpur Nagar, 208017<br />
                    26B/2k Dadanagar 208001, Kanpur, India
                  </p>
                </div>
              </div>

              {/* Social Media */}
              <div>
                <h2 className="text-lg tracking-wider mb-4">FOLLOW US</h2>
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
