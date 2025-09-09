import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";
import { categories } from "../api/categoryData";

const AUTOPLAY_INTERVAL = 2500;
const CARD_WIDTH = 320; // matches Tailwind w-80
const CARD_GAP = 30; // space between cards

const ProductCategories = () => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);

  /** Navigate to category page */
  const handleCardClick = (slug: string) => {
    navigate(`/category/${slug}`);
  };

  /** Start autoplay on mount */
  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (resumeTimeoutRef.current) {
        clearTimeout(resumeTimeoutRef.current);
        resumeTimeoutRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  /** Autoplay controls */
  const startAutoplay = () => {
    stopAutoplay();
    autoplayRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % Math.max(1, categories.length));
    }, AUTOPLAY_INTERVAL);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current) {
      clearInterval(autoplayRef.current as unknown as number);
      autoplayRef.current = null;
    }
  };

  /** Pause autoplay and restart after a short delay when user manually navigates */
  const pauseAndMaybeResume = (fn: () => void) => {
    // quick debug
    // console.debug('pauseAndMaybeResume called');
    stopAutoplay();
    if (resumeTimeoutRef.current) {
      clearTimeout(resumeTimeoutRef.current);
      resumeTimeoutRef.current = null;
    }

    fn();

    // Restart autoplay after a short delay so user's interaction feels responsive
    resumeTimeoutRef.current = window.setTimeout(() => {
      startAutoplay();
      resumeTimeoutRef.current = null;
    }, AUTOPLAY_INTERVAL * 2);
  };

  /** Manual navigation */
  const goToNext = () =>
    pauseAndMaybeResume(() => {
      // console.debug('Next clicked');
      setActiveIndex((prev) => (prev + 1) % Math.max(1, categories.length));
    });

  const goToPrev = () =>
    pauseAndMaybeResume(() => {
      // console.debug('Prev clicked');
      setActiveIndex((prev) => (prev - 1 + categories.length) % Math.max(1, categories.length));
    });

  /** Calculate card position for 3D effect */
  const calculateCardTransform = (index: number) => {
    const totalItems = categories.length || 1;
    const offset = CARD_WIDTH * 0.7 + CARD_GAP; // Add spacing between cards

    // Position relative to activeIndex
    let position = index - activeIndex;

    // Normalize position to the shortest rotation (wrap around)
    const half = Math.floor(totalItems / 2);
    if (position > half) position -= totalItems;
    if (position < -half) position += totalItems;

    if (position === 0) {
      return { scale: 1.1, rotateY: 0, zIndex: 30, x: 0, opacity: 1 };
    } else if (position === -1) {
      return { scale: 0.9, rotateY: 25, zIndex: 20, x: -offset, opacity: 0.85 };
    } else if (position === 1) {
      return { scale: 0.9, rotateY: -25, zIndex: 20, x: offset, opacity: 0.85 };
    } else {
      return {
        scale: 0.8,
        rotateY: 0,
        zIndex: 10,
        x: position * offset,
        opacity: 0.5,
      };
    }
  };

  return (
    <section className="py-20 bg-background" id="products">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-14">
          <h2 className="text-4xl font-extrabold text-foreground uppercase tracking-wide">
            Explore Our Categories
          </h2>
          <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">
            Shop from our premium collection curated for comfort, quality, and style.
          </p>
        </div>

        {/* Carousel Wrapper */}
        <div className="w-full max-w-7xl mx-auto relative">
          {/* Navigation Buttons - moved up in stacking context and made clearly interactive */}
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2 border bg-red-500 shadow-md hover:bg-red-700 w-12 h-12 rounded-full"
            onClick={goToPrev}
            style={{ zIndex: 100, pointerEvents: 'auto' }}
            aria-label="Previous category"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 border bg-red-500 shadow-md hover:bg-red-700 w-12 h-12 rounded-full"
            onClick={goToNext}
            style={{ zIndex: 100, pointerEvents: 'auto' }}
            aria-label="Next category"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex items-center justify-center relative h-[400px] overflow-hidden">
            {categories.map((category, index) => {
              const transform = calculateCardTransform(index);

              return (
                <motion.div
                  key={index}
                  // Make the wrapper itself ignore pointer events so it won't block the nav buttons
                  className="absolute flex justify-center w-full pointer-events-none"
                  onMouseEnter={() => {
                    setHoveredIndex(index);
                    stopAutoplay();
                  }}
                  onMouseLeave={() => {
                    setHoveredIndex(null);
                    startAutoplay();
                  }}
                  animate={{
                    scale: transform.scale,
                    rotateY: transform.rotateY,
                    x: transform.x,
                    opacity: transform.opacity,
                  }}
                  style={{
                    perspective: 1000,
                    transformStyle: "preserve-3d",
                    zIndex: hoveredIndex === index ? 40 : transform.zIndex,
                  }}
                  transition={{
                    type: "spring",
                    stiffness: 260,
                    damping: 25,
                    duration: 0.5,
                  }}
                  whileHover={{
                    scale: transform.scale === 1.1 ? 1.15 : 0.95,
                  }}
                >
                  <Card
                    // ensure the card itself receives pointer events (so cards remain clickable)
                    className="group cursor-pointer border hover:border-primary shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 w-80 h-[340px] rounded-2xl relative bg-white pointer-events-auto"
                    onClick={() => handleCardClick(category.slug)}
                  >
                    <CardHeader className="text-center z-10 relative p-5">
                      <CardTitle className="text-xl font-semibold text-gray-900 tracking-wide uppercase">
                        {category.title}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="h-64 relative rounded-xl overflow-hidden">
                      {/* Image Swap Effect */}
                      <motion.img
                        src={category.image}
                        alt={category.title}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        animate={{ opacity: hoveredIndex === index ? 0 : 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.img
                        src={category.image}
                        alt={category.title}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                    </CardContent>

                    {/* Hover Overlay */}
                    <motion.div
                      className="absolute inset-0 bg-black/0 group-hover:bg-black/60 transition-colors duration-300 flex flex-col items-center justify-center p-6 pointer-events-none"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <p className="text-white text-sm leading-relaxed text-center mb-4 opacity-90 max-w-xs">
                        {category.description}
                      </p>
                      <Button
                        variant="secondary"
                        className="bg-white text-black hover:bg-gray-100 rounded-lg px-5 py-2 flex items-center gap-2 pointer-events-auto"
                      >
                        View Products <ArrowRight className="h-4 w-4" />
                      </Button>
                    </motion.div>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {categories.map((_, index) => (
              <motion.div
                key={index}
                onClick={() => pauseAndMaybeResume(() => setActiveIndex(index))}
                className={`w-3 h-3 rounded-full cursor-pointer ${
                  activeIndex === index ? "bg-primary" : "bg-gray-300"
                }`}
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.95 }}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
