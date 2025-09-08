import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { QrCode, X } from "lucide-react";
import { QRCodeCanvas } from "qrcode.react";
import { topBarMessages } from "@/api/headerData";

interface TopBarProps {
  isScrolled: boolean;
}

const TopBar: React.FC<TopBarProps> = ({ isScrolled }) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [showQR, setShowQR] = useState(false);

  // Replace with your actual live website link
  const appLink = "https://yourwebsite.com";

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % topBarMessages.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  if (isScrolled) return null; // Hide top bar when scrolled down

  return (
    <>
      {/* Top Bar */}
      <motion.div
        key="top-bar"
        initial={{ height: 0, opacity: 0 }}
        animate={{ height: "auto", opacity: 1 }}
        exit={{ height: 0, opacity: 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="bg-gray-100 shadow-sm text-red-600 text-sm md:text-base overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 py-1 flex items-center justify-between relative">
          {/* Centered Rotating Message */}
          <div className="absolute left-1/2 transform -translate-x-1/2 flex flex-col items-center text-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.4 }}
                className="font-extralight"
              >
                {topBarMessages[activeIndex]}
              </motion.div>
            </AnimatePresence>

            {/* Navigation dots */}
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

          {/* QR Code Icon */}
          <button
            onClick={() => setShowQR(true)} // Open modal
            className="flex items-center space-x-2 px-3 py-1 text-gray-700 hover:text-red-600 transition-colors ml-auto"
          >
            <QrCode size={20} />
            <span className="hidden md:inline text-sm">Scan QR</span>
          </button>
        </div>
      </motion.div>

      {/* Full-Screen QR Code Modal */}
      <AnimatePresence>
        {showQR && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-lg p-5 shadow-lg flex flex-col items-center relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setShowQR(false)}
                className="absolute top-2 right-2 text-gray-500 hover:text-red-600 transition-colors"
              >
                <X size={24} />
              </button>

              {/* QR Code */}
              <QRCodeCanvas
                value={appLink}
                size={180}
                bgColor="#ffffff"
                fgColor="#000000"
                level="H"
                includeMargin={true}
              />
              <p className="mt-3 text-sm text-gray-600 text-center">
                Scan to open our website
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default TopBar;
