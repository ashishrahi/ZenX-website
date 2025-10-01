import React, { useRef } from "react";
import Slider from "react-slick";
import { motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

interface Slide {
  _id: string;
  title: string;
  description: string;
  images: string[];
}

interface HeroSectionProps {
  slides: Slide[];
}

const HeroSection: React.FC<HeroSectionProps> = ({ slides }) => {
  const sliderRef = useRef<Slider>(null);

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 5000,
    fade: true,
    pauseOnHover: true,
    arrows: false,
    draggable: true,
  };

  const nestedSettings = {
    dots: false,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
    fade: true,
    infinite: true,
  };

  return (
    <section className="relative w-full h-[80vh] md:h-screen overflow-hidden group rounded-lg">
      {/* Custom Arrows */}
      {/* <button
        className="absolute top-1/2 left-4 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={() => sliderRef.current?.slickPrev()}
      >
        <ChevronLeft className="text-white w-10 h-10" />
      </button>
      <button
        className="absolute top-1/2 right-4 transform -translate-y-1/2 z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        onClick={() => sliderRef.current?.slickNext()}
      >
        <ChevronRight className="text-white w-10 h-10" />
      </button> */}

      {/* Main Slider */}
      <Slider ref={sliderRef} {...settings} className="w-full h-full">
        {slides?.map((slide) => (
          <div key={slide._id} className="relative w-full h-[80vh] md:h-screen">
            {/* Nested Slider for multiple images */}
            <Slider {...nestedSettings} className="w-full h-full">
              {slide.images.map((img, idx) => (
                <motion.img
                  key={idx}
                  src={img}
                  alt={slide.title}
                  className="w-full h-full object-cover object-center"
                  initial={{ scale: 1.1 }}
                  animate={{ scale: 1 }}
                  transition={{ duration: 6, ease: "easeOut" }}
                />
              ))}
            </Slider>

            {/* Overlay */}
            <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center text-center p-4">
              {/* <motion.h1
                className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-lg"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: "easeOut" }}
              >
                {slide.title}
              </motion.h1> */}
              {/* <motion.p
                className="text-lg md:text-xl text-gray-200 max-w-2xl"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.9, ease: "easeOut", delay: 0.2 }}
              >
                {slide.description}
              </motion.p> */}
            </div>
          </div>
        ))}
      </Slider>
    </section>
  );
};

export default HeroSection;
