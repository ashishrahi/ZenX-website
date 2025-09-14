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
import { useCart } from "@/context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import AppButton from "./AppButton";
import { renderStars } from "../utilis/renderStars";

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
    rating?: number;
  };
}

const KidsProductCard: FC<ProductCardProps> = ({ product }) => {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [hoveredColor, setHoveredColor] = useState<string | null>(null);

  const handleViewDetails = () => navigate(`/kids/product/${product?.id}`);
  const isInCart = cart.some((item) => item.id === product.id);
  const inWishlist = isInWishlist(product.id);

  const getPrimaryImage = () => {
    const colorToUse = hoveredColor || (product?.images ? Object.keys(product.images)[0] : null);
    if (!colorToUse || !product?.images) return "";
    return product.images[colorToUse]?.[0] || "";
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => setImageLoading(false);



  return (
    <Card className="group relative rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[480px]">
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
        onClick={() => toggleWishlist(product)}
      >
        <Heart
          className={`h-5 w-5 transition ${inWishlist ? "text-red-500" : "text-gray-500 group-hover:text-red-500"}`}
        />
      </button>

      {/* Product Image */}
      <CardContent
        className="relative flex items-center justify-center h-80 cursor-pointer p-0 rounded-2xl overflow-hidden bg-gray-50"
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
      <CardHeader className="p-5 pb-2 flex-1">
        {product?.colors?.length > 0 && (
          <div className="flex items-center gap-2 mb-3">
            {product.colors.map((color, idx) => (
              <div
                key={idx}
                className="w-5 h-5 rounded-full border border-gray-300 hover:scale-110 transition-transform cursor-pointer shadow-sm"
                style={{ backgroundColor: color }}
                onMouseEnter={() => setHoveredColor(color)}
                onMouseLeave={() => setHoveredColor(null)}
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
          {product?.discountPrice && <span className="text-lg font-bold text-primary">₹{product.discountPrice}</span>}
          <span
            className={`text-xl font-bold text-gray-900 ${product?.discountPrice ? "line-through text-gray-400" : ""}`}
          >
            ₹{product?.price}
          </span>
        </div>

        <AppButton
          className={`w-full py-3 rounded-xl font-medium ${
            isInCart
              ? "bg-muted cursor-not-allowed text-muted-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          } transition-colors duration-300 shadow-md hover:shadow-lg`}
          onClick={() => !isInCart && addToCart(product)}
        >
          {isInCart ? "Added" : "ADD TO BAG"}
        </AppButton>
      </CardFooter>
    </Card>
  );
};

export default KidsProductCard;
