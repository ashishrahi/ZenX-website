// Container.jsx
import React from "react";

const Container = ({ children }) => {
  return (
    <div className="max-w-7xl mx-auto px-6 bg-background mt-16">
      {children}
    </div>
  );
};

export default Container;
