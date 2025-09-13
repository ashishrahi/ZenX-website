import React from "react";

const MenHero = ({ images }) => {
  return (
    <div className="flex justify-center px-4 md:px-8 lg:px-12 py-6">
      {/* Card Container */}
      <div className="w-full max-w-[1200px]">
        <div className="relative w-full h-[300px] sm:h-[350px] md:h-[400px] lg:h-[450px] rounded-2xl shadow-2xl overflow-hidden flex justify-end items-center">
          
          {/* Background Image with Shadow */}
          <img
            src={images.menBanner}
            alt="Men Banner"
            className="w-full h-full object-cover rounded-2xl"
            style={{ objectPosition: "center 20%" }}
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>

          {/* Content */}
          <div className="absolute right-0 z-10 text-right px-4 sm:px-6 md:px-12 lg:px-20">
            <h2 className="text-white text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold uppercase drop-shadow-lg">
              Zen-X <span className="text-red-500">Men</span>
            </h2>
            <p className="mt-3 text-lg sm:text-xl md:text-2xl text-gray-200 drop-shadow">
              Comfort. Style. Everyday.
            </p>
            <button className="mt-6 px-6 py-3 bg-white text-black font-semibold rounded shadow hover:bg-gray-200 transition">
              Shop Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MenHero;
