import React from "react";
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import logo from "../assets/Zen-X-Logo-300x139-removebg-preview.webp"; // Replace with your logo path

const LoadingPage: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
      <Card className="p-6 bg-white bg-opacity-20 backdrop-blur-md rounded-xl shadow-lg flex flex-col items-center">
        {/* Logo with subtle fade animation */}
        <motion.img
          src={logo}
          alt="Logo"
          className="w-24 h-24 object-contain"
          animate={{ opacity: [0.5, 1, 0.5], scale: [0.95, 1, 0.95] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        />
        <motion.p
          className="mt-4 text-white text-lg font-medium"
          animate={{ opacity: [0.5, 1, 0.5] }}
          transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        >
          Loading...
        </motion.p>
      </Card>
    </div>
  );
};

export default LoadingPage;
