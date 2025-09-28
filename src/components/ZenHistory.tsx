import React from "react";
import { FaBuilding, FaHistory, FaGlobe, FaUsers } from "react-icons/fa";
import ZenxLogo from "@/assets/shriganesh.jpg"; // Update with your logo path

const ZenHistory = () => {
  const timeline = [
    {
      year: "2018",
      title: "Chapter One",
      icon: <FaHistory className="text-green-600 text-2xl" />,
      description:
        "Zenx was founded in 1876, pioneering innerwear and evolving comfort apparel for Men, Women, and Kids across 140+ countries.",
    },
    {
      year: "2019",
      title: "Chapter Two",
      icon: <FaGlobe className="text-green-600 text-2xl" />,
      description:
        "Zenx Industries Ltd. was set up in 1994 to bring the Zenx brand to India, manufacturing and marketing products for Men, Women, and Kids.",
    },
    {
      year: "2020",
      title: "Chapter Three",
      icon: <FaBuilding className="text-green-600 text-2xl" />,
      description:
        "Zenx Industries Ltd. became a public limited company in March 2007 and is listed on the BSE and NSE of India.",
    },
    {
      year: "Present",
      title: "Chapter Four",
      icon: <FaUsers className="text-green-600 text-2xl" />,
      description:
        "The promoters of Zenx in India are the Genomal family, who have been associated with Zenx International Inc. for over 25 years.",
    },
  ];

  return (
    <main className="max-w-5xl mx-auto px-6 py-12">
      {/* Logo Section */}
      <div className="flex flex-col items-center mb-12">
        <img
          src={ZenxLogo}
          alt="Zenx Logo"
          className="h-32 w-32 mb-4 object-contain"
        />
        <h1 className="text-4xl font-bold text-center">
          Zenx History - Evolution of Comfort Apparel
        </h1>
      </div>

      {/* Timeline */}
      <div className="relative border-l-4 border-green-600">
        {timeline.map((item, index) => (
          <div key={index} className="mb-10 ml-6">
            <div className="absolute -left-5 flex items-center justify-center w-10 h-10 bg-white border-4 border-green-600 rounded-full">
              {item.icon}
            </div>
            <span className="text-sm text-gray-500">{item.year}</span>
            <h3 className="text-xl font-semibold text-green-700">
              {item.title}
            </h3>
            <p className="text-gray-700">{item.description}</p>
          </div>
        ))}
      </div>
    </main>
  );
};

export default ZenHistory;
