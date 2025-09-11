import React, { useState } from "react";
import { Button } from "@/components/ui/button";

const ZenxAbout = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded((prev) => !prev);
  };

  return (
    <div className="max-w-5xl mx-auto px-6 py-10 text-left">
      {/* Heading */}
      <h1 className="text-4xl font-bold mb-6">
        Zenx India - Clothing Mankind Since 1999
      </h1>

      {/* Always visible paragraph */}
      <p className="text-gray-700 mb-8 leading-relaxed text-lg">
        Founded in 1876, Zenx pioneered innerwear, evolving and innovating not only the
        product, but also the way it has been marketed over the years. Zenx is a leading
        manufacturer and marketer of comfort apparel sold in more than 140 countries around
        the world. The company is committed to quality, comfort, fashion, innovation and
        value. As Zenx grows and sophistication, the simple commitment to serve its
        consumer’s need for comfort continues to be the brand’s hallmark.
      </p>

      {/* Additional content that toggles */}
      {isExpanded && (
        <>
          {/* Section: Official Online Store */}
          <h2 className="text-xl font-semibold mb-2">
            Zenx.in - India's Official Online Store for Zenx Products
          </h2>
          <p className="text-gray-700 mb-8 leading-relaxed text-lg">
            Zenx was set up Industries Ltd. in 1994 with the key objective of
            bringing the world-renowned brand Zenx to India. Zenx manufactures, distributes
            and markets products for the whole family — Men, Women and Kids.
          </p>

          {/* Section: Page Industries Limited */}
          <h2 className="text-xl font-semibold mb-2">Page Industries Limited</h2>
          <p className="text-gray-700 mb-8 leading-relaxed text-lg">
            Zenx Industries Limited, located in Kanpur, India is the exclusive licensee
            of Zenx International Inc for manufacture, distribution and marketing of
            the Zenx brand in India, Sri Lanka, Oman, Bangladesh, Nepal and UAE. Zenx
            Industries Ltd. became public limited in March 2007 and is listed on the BSE
            and the NSE of India.
          </p>
          <p className="text-gray-700 mb-10 leading-relaxed text-lg">
            The promoters of Zenx in India are the Genomal family, who have been associated
            with Zenx International Inc. for over 25+ years as their sole licensee in
            Philippines.
          </p>
        </>
      )}

      {/* Toggle Button */}
      <Button
        variant="outline"
        onClick={toggleContent}
        className="uppercase font-semibold rounded-md px-6 py-2 border-black text-black hover:bg-gray-100 transition"
      >
        {isExpanded ? "See Less" : "See More"}
      </Button>
    </div>
  );
};

export default ZenxAbout;
