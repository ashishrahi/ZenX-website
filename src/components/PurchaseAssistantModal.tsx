import { motion, AnimatePresence } from "framer-motion";
import { FaUser, FaEnvelope, FaPhone } from "react-icons/fa";
import RibbonTag from "./RibbonTag";

interface PurchaseAssistantModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const PurchaseAssistantModal: React.FC<PurchaseAssistantModalProps> = ({
  isOpen,
  onClose,
}) => {
  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay */}
          <motion.div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />

          {/* Modal Wrapper */}
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 overflow-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            {/* Modal Content */}
            <motion.div
              className="bg-white rounded-xl shadow-2xl w-full max-w-md md:max-w-lg p-6 md:p-8 relative"
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ type: "spring", stiffness: 250, damping: 35 }}
            >
              {/* Retailer Ribbon on Left Side */}
              <RibbonTag label="Retailer" color="bg-red-800" />

              {/* Header */}
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl sm:text-2xl font-semibold text-gray-800">
                  Purchase Assistant
                </h2>
                <button
                  className="text-gray-400 hover:text-gray-600 text-2xl font-bold"
                  onClick={onClose}
                >
                  ×
                </button>
              </div>

              {/* Form */}
              <form className="space-y-4">
                {/* Name */}
                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-1">
                    Name
                  </label>
                  <div className="relative">
                    <FaUser className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Enter your name"
                      className="w-full border border-gray-300 rounded-lg pl-10 p-3 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Email */}
                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-1">
                    Email
                  </label>
                  <div className="relative">
                    <FaEnvelope className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full border border-gray-300 rounded-lg pl-10 p-3 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Phone */}
                <div className="relative">
                  <label className="block text-gray-700 font-medium mb-1">
                    Phone
                  </label>
                  <div className="relative">
                    <FaPhone className="absolute top-1/2 left-3 transform -translate-y-1/2 text-gray-400" />
                    <input
                      type="tel"
                      placeholder="Enter your phone number"
                      className="w-full border border-gray-300 rounded-lg pl-10 p-3 focus:ring-2 focus:ring-red-500 focus:outline-none transition"
                    />
                  </div>
                </div>

                {/* Buttons */}
                <div className="flex justify-end gap-3 mt-4">
                  <button
                    type="button"
                    className="px-5 py-2 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition"
                    onClick={onClose}
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-5 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default PurchaseAssistantModal;
