// Container.jsx
import React from "react";

const Container = ({ children }) => {
  return (
    <div className="w-full max-w-[1600px] mx-auto px-4 lg:px-8 mt-16">
      {children}
    </div>
  );
};

export default Container;
