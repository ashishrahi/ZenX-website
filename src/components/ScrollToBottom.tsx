import React, { useState, useEffect } from "react";

const ScrollButton: React.FC = () => {
  const [isAtBottom, setIsAtBottom] = useState(false);

  // Detect scroll position
  useEffect(() => {
    const handleScroll = () => {
      const totalScrollHeight = document.documentElement.scrollHeight;
      const scrollTop = window.scrollY + window.innerHeight;

      // Check if user is near the bottom
      setIsAtBottom(scrollTop >= totalScrollHeight - 50);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top or bottom
  const handleScroll = () => {
    if (isAtBottom) {
      // Scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    } else {
      // Scroll to bottom
      const totalScrollHeight = document.documentElement.scrollHeight;
      window.scrollTo({ top: totalScrollHeight, behavior: "smooth" });
    }
  };

  return (
    <div
      className="fixed right-0 top-1/2 transform -translate-y-1/2 z-50 flex flex-col items-center"
      style={{ writingMode: "vertical-rl" }}
    >
      <button
        onClick={handleScroll}
        className="bg-primary text-primary-foreground px-3 py-2 rounded-lg shadow-md hover:bg-primary/90 transition-all duration-300"
      >
        {isAtBottom ? "Scroll Up" : "Scroll Down"}
      </button>
    </div>
  );
};

export default ScrollButton;
