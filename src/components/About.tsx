import { useState } from "react";

const About = () => {
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleContent = () => {
    setIsExpanded(!isExpanded);
  };

  return (
    <section id="about" className="max-w-7xl mx-auto px-4 py-12 md:py-20">
      <div className="text-center mb-8">
        <h2 className="text-3xl md:text-4xl font-extralight text-gray-900">
          About Us
        </h2>
        <p className="mt-2 text-gray-600 text-lg">
          Learn more about who we are and what we do
        </p>
      </div>

      <div className="max-w-4xl mx-auto text-gray-700 text-lg leading-relaxed">
        <p>
          We are a team of passionate individuals dedicated to delivering
          high-quality products that combine innovation, functionality, and
          timeless design. Our mission is to provide top-notch solutions for
          modern living while ensuring sustainability and customer satisfaction.
        </p>

        {/* Expanded content */}
        <div
          className={`overflow-hidden transition-all duration-500 ease-in-out ${
            isExpanded ? "max-h-[800px] mt-4" : "max-h-0"
          }`}
        >
          <p className="mt-4">
            Established with a vision to bring premium quality and affordability
            together, we have grown into a trusted brand serving thousands of
            happy customers. Our expert team constantly researches and innovates
            to introduce products that redefine style and comfort.
          </p>
          <p className="mt-4">
            We value transparency, integrity, and excellence. From sourcing the
            best materials to maintaining rigorous quality checks, we leave no
            stone unturned to deliver the best to you. With our customer-first
            approach, we aim to build long-term relationships and a community
            of satisfied clients worldwide.
          </p>
          <p className="mt-4">
            Join us on our journey as we continue to evolve and set new
            benchmarks in the industry. Your trust drives us to achieve more and
            create a lasting impact.
          </p>
        </div>

        {/* Load More / Show Less Button */}
        <div className="text-center mt-6">
          <button
            onClick={toggleContent}
            className="px-6 py-2 text-white bg-yellow-600 hover:bg-yellow-700 rounded-full font-medium transition-colors duration-300"
          >
            {isExpanded ? "Show Less" : "Load More"}
          </button>
        </div>
      </div>
    </section>
  );
};

export default About;
