import React, { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Heart, ImageOff, Star, StarHalf, Star as StarOutline } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";
import { useWishlist } from "../context/wishListContext";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    images?: { [key: string]: string[] };
    colors?: string[];
    category?: string;
    trending?: boolean;
    bestSeller?: boolean;
    rating?: number; // 0-5
  };
}

const MenProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const { wishlist, toggleWishlist, isInWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleViewDetails = () => navigate(`/mens/product/${product?.id}`);
  const isInCart = cart?.some((item) => item?.id === product?.id);
  const inWishlist = isInWishlist?.(product?.id);

  const getPrimaryImage = () => {
    if (!product?.images || Object.keys(product.images)?.length === 0) return "";
    const firstColor = Object.keys(product.images)?.[0];
    if (product.images[firstColor]?.length) return product.images[firstColor]?.[0];
    for (const color in product.images) {
      if (product.images[color]?.length) return product.images[color]?.[0];
    }
    return "";
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => setImageLoading(false);

  const renderStars = (rating: number = 0) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      if (i <= Math.floor(rating)) stars.push(<Star key={i} className="w-4 h-4 text-yellow-400" />);
      else if (i - rating < 1) stars.push(<StarHalf key={i} className="w-4 h-4 text-yellow-400" />);
      else stars.push(<StarOutline key={i} className="w-4 h-4 text-gray-300" />);
    }
    return stars;
  };

  return (
    <Card className="group relative rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 h-full flex flex-col">
      {/* Trending & Best Seller Badges */}
      {product?.trending && !product?.bestSeller && (
        <div className="absolute top-3 left-0 z-20 overflow-visible">
          <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 transform -rotate-45 shadow-lg">
            Trending
          </div>
        </div>
      )}
      {product?.bestSeller && (
        <div className="absolute top-3 left-0 z-30 overflow-visible">
          <div className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 transform -rotate-45 shadow-lg">
            Best Seller
          </div>
        </div>
      )}

      {/* Wishlist Button */}
      <button
        className="absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
        onClick={() => toggleWishlist?.(product)}
      >
        <Heart
          className={`h-5 w-5 transition ${
            inWishlist ? "text-red-500" : "text-gray-500 group-hover:text-red-500"
          }`}
        />
      </button>

      {/* Product Image */}
      <CardContent
        className="relative bg-gray-50 flex items-center justify-center h-80 cursor-pointer p-0 rounded-2xl overflow-hidden"
        onClick={handleViewDetails}
      >
        {imageLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
            <div className="animate-pulse bg-gray-200 h-full w-full"></div>
          </div>
        )}
        {!imageError ? (
          <img
            src={getPrimaryImage()}
            alt={product?.name}
            className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
            onError={handleImageError}
            onLoad={handleImageLoad}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
            <ImageOff className="h-16 w-16 mb-2" />
            <p className="text-sm">Image not available</p>
          </div>
        )}
      </CardContent>

      {/* Product Details */}
      <CardHeader className="p-5 pb-2">
        {product?.colors?.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            {product.colors?.map((color, idx) => (
              <div
                key={idx}
                className="w-5 h-5 rounded-full border border-gray-300 hover:scale-110 transition-transform cursor-pointer shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
        <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-black transition">
          {product?.name}
        </CardTitle>
        <div className="flex items-center gap-1 mb-2">{renderStars(product?.rating)}</div>
        <CardDescription className="line-clamp-2 text-gray-500">
          {product?.description ?? "Premium quality product, designed for everyday comfort."}
        </CardDescription>
      </CardHeader>

      {/* Price + Add to Cart */}
      <CardFooter className="flex flex-col gap-4 p-5 pt-0 mt-auto">
        <div className="flex items-center gap-2">
          {product?.discountPrice && (
            <span className="text-lg font-bold text-primary">₹{product?.discountPrice}</span>
          )}
          <span
            className={`text-xl font-bold text-gray-900 ${
              product?.discountPrice ? "line-through text-gray-400" : ""
            }`}
          >
            ₹{product?.price}
          </span>
        </div>

        <Button
          className={`w-full py-3 rounded-xl font-medium ${
            isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"
          } transition-colors duration-300 shadow-md hover:shadow-lg`}
          onClick={() => !isInCart && addToCart?.(product)}
        >
          {isInCart ? "Added" : "ADD TO BAG"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default MenProductCard;
