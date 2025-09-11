import React from "react";
import { Heart } from "lucide-react";

const Wishlist: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center mt-20">
      <Heart size={64} className="text-gray-400 mb-4 animate-pulse" />
      <h2 className="text-2xl font-semibold mb-2">My Wishlist</h2>
      <p className="text-gray-500">Your wishlist is empty.</p>
    </div>
  );
};

export default Wishlist;
