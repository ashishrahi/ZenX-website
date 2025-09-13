import React from "react";

const KidsHero = ({ images }) => {
  return (
    <div className="px-4 md:px-8 lg:px-12 py-6 flex justify-center">
      {/* Outer Wrapper to Center the Card */}
      <div className="w-full max-w-[1200px]">
        {/* Image Container with Shadow */}
        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl shadow-2xl overflow-hidden flex justify-end items-start">
          
          {/* Background Image */}
          <img
            src={images.kidsBanner}
            alt="Kids Banner"
            className="w-full h-full object-cover rounded-2xl"
            style={{ objectPosition: "center 20%" }} // shifts image down slightly
          />

          {/* Semi-Transparent Overlay */}
          <div className="absolute inset-0 bg-black/20 rounded-2xl"></div>

          {/* Hero Text Content */}
          <div className="absolute right-0 top-0 z-10 text-right px-4 sm:px-6 md:px-12 lg:px-20 mt-6">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase drop-shadow-lg">
              Zen-X <span className="text-red-500">Kids</span>
            </h2>
            <p className="mt-3 text-lg sm:text-xl md:text-2xl text-gray-200 drop-shadow">
              Comfort. Style. Everyday.
            </p>
            {/* Future CTA Button */}
            {/* 
            <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded shadow hover:bg-gray-200 transition">
              Shop Now
            </button> 
            */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default KidsHero;
