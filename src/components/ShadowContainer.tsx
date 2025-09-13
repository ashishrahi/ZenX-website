// Container.jsx
import React from "react";

const ShadowContainer = ({ children }) => {
  return (
       <div className="w-full max-w-[1700px] mx-auto px-4 md:px-8 lg:px-12 py-6">
        <div className="relative rounded-[8px] overflow-hidden w-full max-w-[1600px] mx-auto shadow-2xl">
      {children}
    </div>
    </div>
  );
};

export default ShadowContainer;
