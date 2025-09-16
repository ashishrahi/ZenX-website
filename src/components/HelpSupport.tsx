import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HelpCircle, FileText, ChevronDown, ChevronUp, Phone, Mail, MessageCircle } from "lucide-react";

interface FAQItem {
  question: string;
  answer: string;
}

const faqItems: FAQItem[] = [
  { question: "What sizes are available for innerwear?", answer: "We offer sizes ranging from S to XXL. Please refer to our size chart for exact measurements." },
  { question: "How do I wash my innerwear?", answer: "Wash in cold water with similar colors. Avoid bleach. Check care label for instructions." },
  { question: "Can I return clothing items?", answer: "Returns accepted within 15 days of delivery if items are unworn and with tags attached. Keep receipt or order confirmation." },
  { question: "Do you offer international shipping?", answer: "We ship to over 50 countries. Shipping costs and delivery times vary. Customs duties may apply." },
  { question: "How can I track my order?", answer: "You will receive a tracking number via email once shipped. You can also track via your account." },
  { question: "What payment methods do you accept?", answer: "All major credit cards, PayPal, and installment options in select countries." },
];

const HelpSupport: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const toggleAccordion = (index: number) => setOpenIndex(openIndex === index ? null : index);

  const supportItems = [
    { title: "Help Center", description: "Answers & troubleshooting guides", icon: <HelpCircle className="w-6 h-6 text-white" />, link: "/help" },
    { title: "FAQ", description: "Frequently asked questions", icon: <FileText className="w-6 h-6 text-white" />, link: "/faq" },
    { title: "Contact Us", description: "Reach customer support", icon: <Phone className="w-6 h-6 text-white" />, link: "/contact" },
  ];

  const contactMethods = [
    { method: "Live Chat", availability: "24/7", icon: <MessageCircle className="w-5 h-5 text-white" /> },
    { method: "Email Support", availability: "Response within 24h", icon: <Mail className="w-5 h-5 text-white" /> },
    { method: "Phone Support", availability: "Mon-Fri, 9AM-6PM", icon: <Phone className="w-5 h-5 text-white" /> },
  ];

  return (
    <div className="max-w-6xl mx-auto p-6 font-sans">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-red-600 uppercase mb-2 tracking-wider">Customer Support</h1>
        <p className="text-gray-700 max-w-2xl mx-auto">
          Need help? Our global support team is ready to assist with products, sizing, or orders.
        </p>
      </div>

      {/* Support Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {supportItems.map((item, idx) => (
          <Link
            key={idx}
            to={item.link}
            className="flex flex-col items-start p-6 bg-black rounded-lg shadow-lg hover:shadow-2xl transition-all group"
          >
            <div className="mb-4 p-3 bg-red-600 rounded-full">{item.icon}</div>
            <h4 className="text-lg font-semibold text-white mb-1 group-hover:text-red-500">{item.title}</h4>
            <p className="text-gray-300 text-sm">{item.description}</p>
          </Link>
        ))}
      </div>

      {/* Contact Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {contactMethods.map((method, idx) => (
          <div key={idx} className="flex flex-col p-6 bg-red-600 rounded-lg shadow-lg hover:shadow-xl transition-all text-white">
            <div className="mb-4 p-3 bg-black rounded-full">{method.icon}</div>
            <h4 className="font-semibold text-lg">{method.method}</h4>
            <p className="text-gray-200 text-sm mt-1">{method.availability}</p>
          </div>
        ))}
      </div>

      {/* FAQ Section */}
      <h3 className="text-2xl font-bold text-red-600 mb-4">Frequently Asked Questions</h3>
      <div className="space-y-3">
        {faqItems.map((faq, idx) => (
          <div
            key={idx}
            className={`border-2 ${openIndex === idx ? "border-red-600" : "border-black"} rounded-lg overflow-hidden transition-all`}
          >
            <button
              onClick={() => toggleAccordion(idx)}
              className="w-full flex justify-between items-center p-4 font-medium text-black bg-white hover:bg-red-50 transition"
            >
              {faq.question}
              {openIndex === idx ? <ChevronUp className="w-5 h-5 text-red-600" /> : <ChevronDown className="w-5 h-5 text-red-600" />}
            </button>
            {openIndex === idx && <div className="p-4 text-gray-700 text-sm bg-gray-50">{faq.answer}</div>}
          </div>
        ))}
      </div>

      {/* Additional Note */}
      <div className="mt-10 p-6 bg-black rounded-lg text-center text-white">
        Can't find what you're looking for?{" "}
        {/* <Link  className="text-red-600 font-semibold hover:underline"> */}
          Get in touch
        {/* </Link> */}
        .
      </div>
    </div>
  );
};

export default HelpSupport;
