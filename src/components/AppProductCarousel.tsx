import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, Box } from "lucide-react"; // Box as example placeholder icon
import AppProductCard from "@/components/AppProductCard";
import { ProductCarouselProps } from "../types/productTypes";

const ProductCarousel = ({
  productsData = [],
  title = "Default Title",
  description = "Default Description",
  onWishlistToggle,
}: ProductCarouselProps) => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [slidesToShow, setSlidesToShow] = useState(1);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const updateSlidesToShow = () => {
      if (!containerRef.current) return;
      const width = containerRef.current.offsetWidth;
      setSlidesToShow(width >= 1024 ? 4 : width >= 640 ? 2 : 1);
    };
    updateSlidesToShow();
    window.addEventListener("resize", updateSlidesToShow);
    return () => window.removeEventListener("resize", updateSlidesToShow);
  }, []);

  const nextSlide = () => {
    if (currentIndex < productsData.length - slidesToShow) setCurrentIndex(prev => prev + 1);
  };
  const prevSlide = () => {
    if (currentIndex > 0) setCurrentIndex(prev => prev - 1);
  };
  const slideWidth = `${100 / slidesToShow}%`;

  return (
    <section className="py-2 bg-background" id="product-carousel">
      <div className="container mx-auto px-4">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold tracking-wide uppercase">
            {title.split(" ").map((word, idx) => (
              <span
                key={idx}
                className={
                  idx === 0 ? "text-black" : idx === 1 ? "text-red-500" : "text-foreground"
                }
              >
                {word}{" "}
              </span>
            ))}
          </h2>
          <p className="text-muted-foreground text-sm mt-2">{description}</p>
        </div>

        <div className="relative" ref={containerRef}>
          {productsData.length === 0 ? (
            <div className="flex justify-center items-center h-64 text-gray-400">
              <Box className="h-16 w-16" />
              <span className="ml-2 text-lg">No Products Available</span>
            </div>
          ) : (
            <>
              <button
                onClick={prevSlide}
                disabled={currentIndex === 0}
                className={`absolute left-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-800 z-20 transition ${
                  currentIndex === 0 ? "opacity-50 cursor-not-allowed" : "hover:bg-red-900"
                }`}
              >
                <ChevronLeft className="h-6 w-6 text-white" />
              </button>

              <div className="overflow-hidden">
                <motion.div
                  className="flex"
                  animate={{ x: `-${currentIndex * (100 / slidesToShow)}%` }}
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                >
                  {productsData.map((product, index) => (
                    <div key={product.id} className="flex-shrink-0" style={{ width: slideWidth }}>
                      <div className="p-2 relative">
                        <motion.div
                          initial={{ opacity: 0, y: 40 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.1 }}
                          viewport={{ once: true }}
                          onMouseEnter={() => setHoveredIndex(index)}
                          onMouseLeave={() => setHoveredIndex(null)}
                        >
                          <AppProductCard
                            product={product}
                            hovered={hoveredIndex === index}
                            toggleWishlist={() => onWishlistToggle?.(product)}
                            basePath={`/${product.gender ?? "mens"}`}
                          />
                        </motion.div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </div>

              <button
                onClick={nextSlide}
                disabled={currentIndex >= productsData.length - slidesToShow}
                className={`absolute right-0 top-1/2 -translate-y-1/2 p-2 rounded-full bg-red-700 z-20 transition ${
                  currentIndex >= productsData.length - slidesToShow
                    ? "opacity-50 cursor-not-allowed"
                    : "hover:bg-red-900"
                }`}
              >
                <ChevronRight className="h-6 w-6 text-white" />
              </button>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default ProductCarousel;
