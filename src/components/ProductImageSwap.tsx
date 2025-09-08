import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProductImageProps {
  mainImage: string;
  secondaryImage: string;
}

const ProductImageSwap: React.FC<ProductImageProps> = ({ mainImage, secondaryImage }) => {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="relative w-full h-64 cursor-pointer overflow-hidden"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <AnimatePresence mode="wait">
        <motion.img
          key={hovered ? secondaryImage : mainImage}
          src={hovered ? secondaryImage : mainImage}
          alt="Product"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute inset-0 w-full h-full object-cover"
        />
      </AnimatePresence>
    </div>
  );
};

export default ProductImageSwap;
