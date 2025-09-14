import React from "react";
import { Button } from "./ui/button";
import CollapsibleSection from "./CollapsibleSection";
import images from "@/assets/men/images";

const faqData = [
  {
    question: "How do I choose the right size for innerwear?",
    answer:
      "We recommend checking our detailed size guide before making a purchase. If you're between sizes, opt for the larger size for comfort.",
  },
  {
    question: "Can I exchange or return innerwear after purchase?",
    answer:
      "For hygiene reasons, innerwear cannot be returned or exchanged once opened. However, if the product is damaged or defective, we offer hassle-free returns.",
  },
  {
    question: "How should I care for my innerwear to make it last longer?",
    answer:
      "Wash innerwear with mild detergent in cold water and avoid bleach. Air dry instead of using a dryer to maintain fabric quality.",
  },
  {
    question: "Do you offer discounts on bulk orders?",
    answer:
      "Yes, we provide special discounts on bulk orders. Please contact our sales team for more details.",
  },
  {
    question: "Is international shipping available?",
    answer:
      "Yes, we ship internationally. Shipping fees and delivery times may vary based on your location.",
  },
];

const FAQSection = () => {
  return (
    <section className="w-full max-w-6xl mx-auto px-4 py-16 rounded-3xl shadow-sm bg-background">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side - Image with Overlay */}
        <div className="relative w-full h-[420px] rounded-2xl overflow-hidden shadow-lg">
          <img
            src={images.fqQ}
            alt="Innerwear FAQ Illustration"
            className="w-full h-full object-cover rounded-2xl transition-transform duration-500 hover:scale-105"
          />
          <div className="absolute inset-0 bg-black/30 rounded-2xl"></div>
          <div className="absolute bottom-4 left-4 px-4 py-2 rounded-lg shadow text-sm font-semibold bg-white/90 text-foreground">
            Quality Innerwear You Can Trust
          </div>
        </div>

        {/* Right Side - FAQ Section */}
        <div>
          <h2 className="text-4xl font-bold mb-3 text-foreground">
            Frequently Asked Questions
          </h2>
          <p className="mb-8 text-muted-foreground">
            Find answers to common questions about our innerwear products,
            sizing, and policies.
          </p>

          {/* Collapsible Sections instead of Accordion */}
          <div className="space-y-3">
            {faqData.map((item, index) => (
              <CollapsibleSection
                key={index}
                title={item.question}
                content={item.answer}
              />
            ))}
          </div>

          {/* Contact Section */}
          <div className="mt-10 p-5 rounded-xl border border-destructive/20 bg-destructive/10">
            <h3 className="text-xl font-semibold mb-2 text-foreground">
              Still have questions?
            </h3>
            <p className="mb-4 text-muted-foreground">
              Can’t find the answer you’re looking for? Reach out to our
              customer care team for assistance.
            </p>
            <Button className="px-6 py-2 rounded-lg shadow bg-destructive text-white hover:bg-primary transition-colors">
              Contact Us
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
