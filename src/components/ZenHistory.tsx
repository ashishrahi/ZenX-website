import React from "react";
import { FaBuilding, FaHistory, FaGlobe, FaUsers } from "react-icons/fa";
import useEmblaCarousel from 'embla-carousel-react';
import Autoplay from 'embla-carousel-autoplay';
import ZenxLogo from "@/assets/shriganesh.jpg";
import image1 from '../assets/2banner.webp'
import image2 from '../assets/3banner.webp'

const ZenHistory = () => {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 4000 })]);
   
  const timeline = [
    {
      year: "2018",
      title: "Chapter One",
      icon: <FaHistory className="text-red-600 text-2xl" />,
      description: "Zenx was founded in 1970, pioneering innerwear and evolving comfort apparel for Men, Women, and Kids across 140+ countries.",
      image: image1
    },
    {
      year: "2019",
      title: "Chapter Two",
      icon: <FaGlobe className="text-red-600 text-2xl" />,
      description: "Zenx Industries Ltd. was set up in 1994 to bring the Zenx brand to India, manufacturing and marketing products for Men, Women, and Kids.",
      image: image2 
    },
    {
      year: "2020",
      title: "Chapter Three",
      icon: <FaBuilding className="text-red-600 text-2xl" />,
      description: "Zenx Industries Ltd. became a public limited company in March 2007 and is listed on the BSE and NSE of India.",
      image:  image1 
    },
    {
      year: "Present",
      title: "Chapter Four",
      icon: <FaUsers className="text-red-600 text-2xl" />,
      description: "The promoters of Zenx in India are the Genomal family, who have been associated with Zenx International Inc. for over 25 years.",
      image: image2 
    },
  ];

  const scrollPrev = () => emblaApi?.scrollPrev();
  const scrollNext = () => emblaApi?.scrollNext();

  return (
    <main className="max-w-6xl mx-auto px-6 py-8">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-16">
        <img
          src={ZenxLogo}
          alt="Zenx Logo"
          className="h-60 w-60 mb-6 object-contain rounded-lg "
        />
        <h1 className="text-5xl font-bold text-center text-gray-800 mb-4">
          Zenx History
        </h1>
        <p className="text-xl text-gray-600 text-center max-w-3xl">
          Evolution of Comfort Apparel - A Legacy of Excellence Since 1970
        </p>
      </div>

      {/* Image Carousel Section */}
      <section className="mb-16">
        <div className="relative bg-gradient-to-r from-red-50 to-gray-100 rounded-2xl p-8 shadow-xl border border-gray-200">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">
            Our Journey Through Time
          </h2>
          
          <div className="relative">
            <div className="embla overflow-hidden rounded-xl" ref={emblaRef}>
              <div className="embla__container flex">
                {timeline.map((item, index) => (
                  <div key={index} className="embla__slide flex-[0_0_100%] min-w-0">
                    <div className="relative h-96 rounded-xl overflow-hidden">
                      <img
                        src={item.image}
                        alt={item.title}
                        className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div className="text-center text-white p-6">
                          <div className="inline-flex items-center justify-center w-16 h-16 bg-white bg-opacity-20 rounded-full backdrop-blur-sm mb-4">
                            {item.icon}
                          </div>
                          <h3 className="text-2xl font-bold mb-2">{item.title}</h3>
                          <p className="text-lg opacity-90">{item.year}</p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Carousel Controls */}
            <button
              className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-90 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 z-10 border border-gray-300"
              onClick={scrollPrev}
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>
            <button
              className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white bg-opacity-90 rounded-full shadow-lg flex items-center justify-center hover:bg-opacity-100 transition-all duration-200 z-10 border border-gray-300"
              onClick={scrollNext}
            >
              <svg className="w-6 h-6 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>

            {/* Dots Indicator */}
            <div className="flex justify-center mt-6 space-x-2">
              {timeline.map((_, index) => (
                <button
                  key={index}
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    emblaApi?.selectedScrollSnap() === index 
                      ? 'bg-red-600 w-8' 
                      : 'bg-gray-400 hover:bg-gray-600'
                  }`}
                  onClick={() => emblaApi?.scrollTo(index)}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Timeline Section */}
      <section className="bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Our Historical Timeline
        </h2>
        
        <div className="relative">
          {/* Vertical Line */}
          <div className="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-red-600 to-black rounded-full"></div>
          
          {timeline.map((item, index) => (
            <div key={index} className="relative flex items-start mb-12 last:mb-0">
              {/* Icon Circle */}
              <div className="absolute left-4 flex items-center justify-center w-12 h-12 bg-white border-4 border-red-600 rounded-full shadow-lg z-10">
                {item.icon}
              </div>
              
              {/* Content Card */}
              <div className="ml-24 bg-gradient-to-r from-red-50 to-gray-100 rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 flex-1 border border-gray-200">
                <div className="flex items-center justify-between mb-4">
                  <span className="text-sm font-semibold text-red-600 bg-white px-3 py-1 rounded-full shadow-sm border border-gray-300">
                    {item.year}
                  </span>
                  <h3 className="text-2xl font-bold text-gray-800">
                    {item.title}
                  </h3>
                </div>
                <p className="text-gray-700 text-lg leading-relaxed">
                  {item.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-200">
          <div className="text-3xl font-bold text-red-600 mb-2">10+</div>
          <div className="text-gray-600">Countries Worldwide</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-200">
          <div className="text-3xl font-bold text-red-600 mb-2">25+</div>
          <div className="text-gray-600">Years in India</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-200">
          <div className="text-3xl font-bold text-red-600 mb-2">3</div>
          <div className="text-gray-600">Product Categories</div>
        </div>
        <div className="bg-white rounded-2xl p-6 shadow-lg text-center hover:shadow-xl transition-all duration-300 border border-gray-200">
          <div className="text-3xl font-bold text-red-600 mb-2">1970</div>
          <div className="text-gray-600">Founded Year</div>
        </div>
      </section>
    </main>
  );
};

export default ZenHistory;