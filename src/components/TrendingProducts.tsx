import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";
import Sweater from "../assets/swater.avif";
import { trendingProducts as productsData } from "../api/productsData";

const TrendingProducts = () => {
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
    if (currentIndex < productsData.length - slidesToShow) {
      setCurrentIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex((prev) => prev - 1);
  };

  const slideWidth = `${100 / slidesToShow}%`;

  return (
    <section className="py-16 bg-background" id="trending-products">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-wide uppercase text-foreground">
            Trending Products
          </h2>
          <p className="text-muted-foreground text-sm mt-2">
            Discover our bestselling innerwear, kids' wear & winter essentials.
          </p>
        </div>

        {/* Carousel */}
        <div className="relative" ref={containerRef}>
          {/* Left Arrow */}
          <button
            onClick={prevSlide}
            disabled={currentIndex === 0}
            className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-800  z-20 transition ${
              currentIndex === 0
                ? "opacity-50 cursor-not-allowed"
                : "hover: bg-red-800"
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
              {productsData.map((product, index) => (
                <div
                  key={product.id}
                  className="flex-shrink-0"
                  style={{ width: slideWidth }}
                >
                  <div className="p-2">
                    <motion.div
                      initial={{ opacity: 0, y: 40 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      onMouseEnter={() => setHoveredIndex(index)}
                      onMouseLeave={() => setHoveredIndex(null)}
                    >
                      <ProductCard
                        product={product}
                        primaryImage={product.images.Burgundy || Sweater}
                        secondaryImage={product.images.Black || Sweater}
                        onAddToBag={handleAddToBag}
                        onWishlistToggle={handleWishlistToggle}
                        hovered={hoveredIndex === index}
                      />
                    </motion.div>
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right Arrow */}
          <button
            onClick={nextSlide}
            disabled={currentIndex >= productsData.length - slidesToShow}
            className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-700 z-20 transition ${
              currentIndex >= productsData.length - slidesToShow
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-red-700"
            }`}
          >
            <ChevronRight className="h-6 w-6 text-white" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default TrendingProducts;
