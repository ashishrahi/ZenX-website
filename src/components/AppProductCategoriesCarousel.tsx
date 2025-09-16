import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

interface ProductCategoriesCarouselProps {
  title: string;
  description: string;
  categories: {
    slug: string;
    name: string;
    description: string;
    images: Record<string, string[]>;
    gender: "mens" | "womens" | "kids"
  }[];
}

const AUTOPLAY_INTERVAL = 2500;
const CARD_WIDTH = 320;
const CARD_GAP = 30;

const AppProductCategoriesCarousel = ({ title, description, categories }: ProductCategoriesCarouselProps) => {
  const navigate = useNavigate();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const autoplayRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const resumeTimeoutRef = useRef<number | null>(null);

  // ===== Autoplay Management =====
  const startAutoplay = () => {
    stopAutoplay();
    if (!categories?.length) return;

    autoplayRef.current = window.setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % categories?.length);
    }, AUTOPLAY_INTERVAL);
  };

  const stopAutoplay = () => {
    if (autoplayRef.current !== null) clearInterval(autoplayRef.current);
  };

  const pauseAndMaybeResume = (action: () => void) => {
    stopAutoplay();
    if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);

    action();

    resumeTimeoutRef.current = window.setTimeout(() => {
      startAutoplay();
      resumeTimeoutRef.current = null;
    }, AUTOPLAY_INTERVAL * 2);
  };

  const goToNext = () =>
    pauseAndMaybeResume(() => setActiveIndex((prev) => (prev + 1) % categories.length));

  const goToPrev = () =>
    pauseAndMaybeResume(() => setActiveIndex((prev) => (prev - 1 + categories.length) % categories.length));

  // ===== Card Transform Logic =====
  const calculateCardTransform = (index: number) => {
    const totalItems = categories.length;
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

  // ===== Image Helpers =====
  const getImage = (imagesObj?: Record<string, string[]>, index = 0) => {
    if (!imagesObj) return "";
    const colors = Object.keys(imagesObj);
    return imagesObj[colors[index]]?.[0] || "";
  };

  // ===== Lifecycle =====
  useEffect(() => {
    startAutoplay();
    return () => {
      stopAutoplay();
      if (resumeTimeoutRef.current) clearTimeout(resumeTimeoutRef.current);
    };
  }, [categories]);

 const handleCardClick = (gender: string, slug: string) => {
  navigate(`/${gender}/category/${slug}`,{ replace: false });
};

  return (
    <section className="py-12 bg-background" id="products">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-14">
          <h2 className="text-3xl font-bold tracking-wide uppercase">
            {title?.split(" ").map((word, index) => (
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
            aria-label="Previous category"
            style={{ zIndex: 45 }}
            
          >
            <ChevronLeft className="h-6 w-6" />
          </Button>

          <Button
            className="absolute right-0 top-1/2 -translate-y-1/2 border bg-red-500 shadow-md hover:bg-red-700 w-12 h-12 rounded-full"
            onClick={goToNext}
            aria-label="Next category"
            style={{ zIndex: 45 }}
          >
            <ChevronRight className="h-6 w-6" />
          </Button>

          {/* Cards */}
          <div className="flex items-center justify-center relative h-[400px] overflow-hidden">
            {categories?.map((category, index) => {
              const transform = calculateCardTransform(index);

              return (
                <motion.div
                  key={category.slug}
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
                    onClick={() => handleCardClick(category.gender, category.slug)}
                  >
                    <CardContent className="h-full relative rounded-2xl p-0">
                      {/* Default Image */}
                      <motion.img
                        src={getImage(category.images, 0)}
                        alt={category.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        animate={{ opacity: hoveredIndex === index ? 0.9 : 1 }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Hover Image */}
                      <motion.img
                        src={getImage(category.images, 1) || getImage(category.images, 0)}
                        alt={category.name}
                        className="absolute top-0 left-0 w-full h-full object-cover"
                        animate={{ opacity: hoveredIndex === index ? 1 : 0 }}
                        transition={{ duration: 0.5 }}
                      />

                      {/* Content */}
                      <div className="absolute inset-0 flex flex-col justify-end p-6 bg-black/30 text-white">
                        <h3 className="text-xl font-bold uppercase">{category.name}</h3>
                        <p className="text-sm mt-2">{category.description}</p>
                        <Button
                         type="button"
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
            {categories?.map((_, index) => (
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

export default AppProductCategoriesCarousel;
