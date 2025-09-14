import { Star, StarHalf, Star as StarOutline } from "lucide-react";
import React from "react";

/**
 * Returns an array of star icons based on rating.
 * @param rating number between 0-5
 * @param size optional icon size in pixels (default 16)
 */
export const renderStars = (rating: number = 0, size: number = 16) => {
  const stars: React.ReactNode[] = [];
  for (let i = 1; i <= 5; i++) {
    if (i <= Math.floor(rating)) {
      stars.push(<Star key={i} color="#FFD700" size={size} />);
    } else if (i - rating < 1) {
      stars.push(<StarHalf key={i} color="#FFD700" size={size} />);
    } else {
      stars.push(<StarOutline key={i} color="#D1D5DB" size={size} />);
    }
  }
  return stars;
};
