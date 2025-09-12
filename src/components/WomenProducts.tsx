import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import WomenProductCard from "./WomenProductCard";
import Sweater from "../assets/swater.avif";

interface Product {
  id: number;
  name: string;
  images: { [key: string]: string };
  tag?: string[];
}

interface TrendingProductsProps {
  productsData: Product[];
  title: string;
  description: string;
}

const WomenProducts = ({ productsData, title, description }: TrendingProductsProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (!containerRef.current) return;

      const containerWidth = containerRef.current.offsetWidth;
      if (containerWidth >= 1024) setSlidesToShow(4);
      else if (containerWidth >= 640) setSlidesToShow(2);
      else setSlidesToShow(1);
    };

    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const handleAddToBag = (productId: number) => {
    console.log("Added to Bag:", productId);
  };

  const handleWishlistToggle = (productId: number) => {
    console.log("Wishlist toggled for:", productId);
  };

  const nextSlide = () => {
    if (currentIndex < productsData?.length - slidesToShow) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const slideWidth = `${100 / slidesToShow}%`;

  return (
    <section className="py-2 bg-background" id="trending-products">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-wide uppercase">
            {title?.split(" ").map((word, index) => (
              <span
                key={index}
                className={
                  index === 0
                    ? "text-black"
                    : index === 1
                    ? "text-red-500"
                    : "text-foreground"
                }
              >
                {word}{" "}
              </span>
            ))}
          </h2>
          <p className="text-muted-foreground text-sm mt-2">{description}</p>
        </div>

        {/* Carousel */}
        <div className="relative" ref={containerRef}>
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-800 z-20 transition ${
              currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-900"
            }`}
          >
            <ChevronLeft className="h-6 w-6 text-white" />
          </button>

          {/* Carousel Track */}
          <div className="overflow-hidden">
            <motion.div
              className="flex"
              initial={false}
              animate={{ x: `-${currentIndex * (100 / slidesToShow)}%` }}
              transition={{ type: "spring", stiffness: 300, damping: 30 }}
            >
              {productsData?.map((product, index) => (
                <div
                  key={product.id}
                  className="flex-shrink-0"
                  style={{ width: slideWidth }}
                >
                  <div className="p-2 relative">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      {/* Product Card */}
                      <WomenProductCard
                        product={product}
                        primaryImage={product.images.Burgundy || Sweater}
                        secondaryImage={product.images.Black || Sweater}
                        onAddToBag={handleAddToBag}
                        onWishlistToggle={handleWishlistToggle}
                        hovered={hoveredIndex === index}
                      />

                      {/* Floating Badge */}
                      {product.tag && product.tag.length > 0 && (
                        <div className="absolute top-2 left-2 flex flex-col items-start space-y-2 z-20">
                          {product.tag.map((badge, index) => (
                            <motion.div
                              key={index}
                              initial={{ y: 0, opacity: 0 }}
                              animate={{
                                y: [0, -3, 0], // subtle floating effect
                                opacity: 1,
                              }}
                              transition={{
                                duration: 3,           // slow and smooth
                                ease: "easeInOut",     // natural easing
                                repeat: Infinity,       // continuous loop
                                repeatType: "mirror",   // smooth reverse instead of restart
                              }}
                              className={`px-2 py-1 text-[10px] font-bold shadow-md rounded ${
                                badge === "Best Seller"
                                  ? "bg-yellow-500 text-black"
                                  : badge === "Premium"
                                  ? "bg-purple-600 text-white"
                                  : "bg-gray-300 text-black"
                              }`}
                            >
                              {badge.toUpperCase()}
                            </motion.div>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= productsData?.length - slidesToShow}
            className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-700 z-20 transition ${
              currentIndex >= productsData?.length - slidesToShow
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-900"
            }`}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default WomenProducts;
