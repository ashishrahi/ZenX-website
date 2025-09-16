import React from "react";
import { FaBuilding, FaHistory, FaGlobe, FaUsers } from "react-icons/fa";

const ZenHistory = () => {
  return (
    <main className="max-w-5xl mx-auto px-6 py-12 text-left">
      <h1 className="text-5xl font-bold mb-6" itemProp="headline">
        Zenx History - Evolution of Comfort Apparel in India
      </h1>

      {/* Intro Section */}
      <section className="mb-10" itemScope itemType="https://schema.org/Organization">
        <FaHistory className="inline-block mr-2 text-gray-700" />
        <h2 className="text-2xl font-semibold mb-4">Our Journey</h2>
        <p className="text-gray-700 leading-relaxed text-lg" itemProp="description">
          Founded in 1876, Zenx pioneered innerwear, evolving and innovating not only the
          product, but also the way it has been marketed globally. Zenx manufactures,
          distributes, and markets comfort apparel for the whole family — Men, Women, and Kids — in more than 140 countries.
        </p>
      </section>

      {/* Official Operations Section */}
      <section className="mb-10">
        <FaGlobe className="inline-block mr-2 text-gray-700" />
        <h2 className="text-2xl font-semibold mb-4">Zenx in India</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Zenx Industries Ltd. was set up in 1994 to bring the world-renowned Zenx brand
          to India. The company manufactures, distributes, and markets products for Men,
          Women, and Kids, providing comfort and quality in every product.
        </p>
      </section>

      {/* Company Information Section */}
      <section className="mb-10">
        <FaBuilding className="inline-block mr-2 text-gray-700" />
        <h2 className="text-2xl font-semibold mb-4">Page Industries Limited</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          Zenx Industries Limited, located in Kanpur, India, is the exclusive licensee
          of Zenx International Inc for the manufacture, distribution, and marketing
          of the Zenx brand in India, Sri Lanka, Oman, Bangladesh, Nepal, and UAE.
          Zenx Industries Ltd. became a public limited company in March 2007 and is
          listed on the BSE and NSE of India.
        </p>
      </section>

      {/* Founders Section */}
      <section className="mb-10">
        <FaUsers className="inline-block mr-2 text-gray-700" />
        <h2 className="text-2xl font-semibold mb-4">Our Promoters</h2>
        <p className="text-gray-700 leading-relaxed text-lg">
          The promoters of Zenx in India are the Genomal family, who have been associated
          with Zenx International Inc. for over 25 years as their sole licensee in the
          Philippines. Their commitment to quality and innovation continues to drive
          Zenx’s growth in India and abroad.
        </p>
      </section>
    </main>
  );
};

export default ZenHistory;
