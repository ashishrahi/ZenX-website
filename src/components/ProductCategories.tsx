import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

const AUTOPLAY_INTERVAL = 2500;
const CARD_WIDTH = 320;
const CARD_GAP = 30;

const ProductCategories = ({ title, categories = [], description }) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);

  // Flatten all subCategories for carousel
  const allSubCategories = categories
    .filter((v, i, a) => a.findIndex(cat => cat.slug === v.slug) === i) 
    .flatMap(cat => cat.subCategories || []);

  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>, slug?: string) => {
  e.preventDefault(); // Prevent default browser behavior

  if (slug) {
    navigate(`/category/${slug}`);
  }
};

  const startAutoplay = () => {
    stopAutoplay();
    if (!allSubCategories?.length) return;

    autoplayRef.current = window.setInterval(() => {
      setActiveIndex(prev => (prev + 1) % allSubCategories.length);
    }, AUTOPLAY_INTERVAL);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current !== null) clearInterval(autoplayRef.current);
  };

  const pauseAndMaybeResume = (fn: () => void) => {
    stopAutoplay();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    fn();

    resumeTimeoutRef.current = window.setTimeout(() => {
      startAutoplay();
      resumeTimeoutRef.current = null;
    }, AUTOPLAY_INTERVAL * 2);
  };

  const goToNext = () =>
    pauseAndMaybeResume(() => setActiveIndex(prev => (prev + 1) % allSubCategories.length));

  const goToPrev = () =>
    pauseAndMaybeResume(() => setActiveIndex(prev => (prev - 1 + allSubCategories.length) % allSubCategories.length));

  const calculateCardTransform = (index: number) => {
    const totalItems = allSubCategories.length;
    const offset = CARD_WIDTH * 0.7 + CARD_GAP;
    let position = index - activeIndex;
    const half = Math.floor(totalItems / 2);
    if (position > half) position -= totalItems;
    if (position < -half) position += totalItems;

    if (position === 0) return { scale: 1.1, rotateY: 0, zIndex: 30, x: 0, opacity: 1 };
    else if (position === -1) return { scale: 0.9, rotateY: 25, zIndex: 20, x: -offset, opacity: 0.85 };
    else if (position === 1) return { scale: 0.9, rotateY: -25, zIndex: 20, x: offset, opacity: 0.85 };
    else return { scale: 0.8, rotateY: 0, zIndex: 10, x: position * offset, opacity: 0.5 };
  };

  const getFirstImage = (imagesObj?: Record<string, string[]>) => {
    if (!imagesObj) return "";
    const firstColor = Object.keys(imagesObj)?.[0];
    return imagesObj[firstColor]?.[0] || "";
  };

  const getHoverImage = (imagesObj?: Record<string, string[]>) => {
    if (!imagesObj) return "";
    const colors = Object.keys(imagesObj);
    return colors[1] ? imagesObj[colors[1]][0] : imagesObj[colors[0]][0];
  };

  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [categories]);

  return (
    <section className="py-12 bg-background" id="products">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-wide uppercase">
            {title?.split(" ")?.map((word, index) => (
              <span
                key={index}
                className={index === 0 ? "text-black" : index === 1 ? "text-red-500" : "text-foreground"}
              >
                {word}{" "}
              </span>
            ))}
          </h2>
          <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">{description}</p>
        </div>

        {/* Carousel */}
        <div className="w-full max-w-7xl mx-auto relative">
          {/* Navigation Buttons */}
          <Button
            className="absolute left-0 top-1/2 -translate-y-1/2 border bg-red-500 shadow-md hover:bg-red-700 w-12 h-12 rounded-full"
            onClick={goToPrev}
            style={{ zIndex: 45, pointerEvents: "auto" }}
            aria-label="Previous category"
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 border bg-red-500 shadow-md hover:bg-red-700 w-12 h-12 rounded-full"
            onClick={goToNext}
            style={{ zIndex: 45, pointerEvents: "auto" }}
            aria-label="Next category"
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          <div className="flex items-center justify-center relative h-[400px] overflow-hidden">
            {allSubCategories?.map((category, index) => {
              const transform = calculateCardTransform(index);

              return (
                <motion.div
                  key={index}
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
                  transition={{ type: "spring", stiffness: 260, damping: 25, duration: 0.5 }}
                  whileHover={{ scale: transform.scale === 1.1 ? 1.15 : 0.95 }}
                >
                  <Card
                    className="group cursor-pointer border shadow-lg hover:shadow-2xl overflow-hidden transition-all duration-500 w-80 h-[340px] rounded-2xl relative bg-white pointer-events-auto"
                    onClick={() => handleCardClick(category?.slug)}
                  >
                    <CardContent className="h-full relative rounded-2xl p-0">
                      <motion.img
                        src={getFirstImage(category?.images)}
                        alt={category?.name || "Category"}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        animate={{ opacity: hoveredIndex === index ? 0.9 : 1 }}
                        transition={{ duration: 0.5 }}
                      />
                      <motion.img
                        src={hoveredIndex === index ? getHoverImage(category?.images) : getFirstImage(category?.images)}
                        alt={category?.name || "Category"}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />
                      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-black/30 text-white">
                        <h3 className="text-xl font-bold uppercase">{category?.name}</h3>
                        <p className="text-sm mt-2">{category?.description}</p>
                        <Button
                          variant="secondary"
                          className="bg-white text-black hover:bg-gray-100 rounded-lg px-5 py-2 mt-4 self-start"
                        >
                          View Products <ArrowRight className="h-4 w-4" />
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Dots Pagination */}
          <div className="flex justify-center mt-6 gap-2">
            {allSubCategories?.map((_, index) => (
              <motion.div
                key={index}
                onClick={() => pauseAndMaybeResume(() => setActiveIndex(index))}
                className={`w-3 h-3 rounded-full cursor-pointer ${activeIndex === index ? "bg-primary" : "bg-gray-300"}`}
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
