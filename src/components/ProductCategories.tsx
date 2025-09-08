import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {categories} from '../api/categoryData'

const ProductCategories = () => {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const navigate = useNavigate();

  

  // Overlay animation
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 0.85, transition: { duration: 0.3 } },
  };

  // Text animation
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
  };

  // Handle navigation
  const handleCardClick = (slug: string) => {
    navigate(`/category/${slug}`);
  };

  return (
    <section className="py-16 bg-background" id="products">
      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-extralight text-foreground mb-4 uppercase tracking-wide">
            Our Categories
          </h2>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {categories.map((category, index) => (
            <div
              key={index}
              className="relative flex justify-center"
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              onClick={() => handleCardClick(category.slug)}
            >
              <Card className="cursor-pointer border hover:border-primary overflow-hidden transition-all duration-300 w-72 h-80 rounded-xl relative">
                {/* Card Header */}
                <CardHeader className="text-center z-10 relative p-4">
                  <CardTitle className="text-lg font-serif text-primary uppercase">
                    {category.title}
                  </CardTitle>
                </CardHeader>

                {/* Image Area */}
                <CardContent
                  className="h-56 bg-cover bg-center relative rounded-xl"
                  style={{ backgroundImage: `url(${category.image})` }}
                />

                {/* Overlay with rounded corners */}
                <AnimatePresence>
                  {hoveredIndex === index && (
                    <motion.div
                      className="absolute inset-0 flex items-center justify-center p-4 text-center rounded-xl overflow-hidden"
                      initial="hidden"
                      animate="visible"
                      exit="hidden"
                      variants={overlayVariants}
                      style={{ backgroundColor: "rgba(0, 0, 0, 0.8)" }}
                    >
                      <motion.p
                        className="text-white text-sm leading-relaxed max-w-xs px-2"
                        variants={textVariants}
                      >
                        {category.description}
                      </motion.p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductCategories;
