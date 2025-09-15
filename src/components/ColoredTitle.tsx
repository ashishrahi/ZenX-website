// src/components/ColoredTitle.tsx
import React, { FC } from "react";

interface ColoredTitleProps {
  title: string;
  colors?: string[]; // Optional: allow passing custom colors
}

const ColoredTitle: FC<ColoredTitleProps> = ({ title, colors = ["text-black", "text-red-500", "text-foreground"] }) => {
  return (
    <>
      {title.split(" ").map((word, idx) => (
        <span key={idx} className={colors[idx] || colors[colors.length - 1]}>
          {word}{" "}
        </span>
      ))}
    </>
  );
};

export default ColoredTitle;
