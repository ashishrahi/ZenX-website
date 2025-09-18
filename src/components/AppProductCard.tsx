// src/components/AppProductCard.tsx
import React, { FC, useState, MouseEvent } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Heart, ImageOff, ShoppingBag } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { renderStars } from "../utilis/renderStars";
import AppButton from "./AppComponent/AppButton";
import RibbonTag from "./RibbonTag";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ProductCardProps } from "@/types/ProductCardProps";



const AppProductCard: FC<ProductCardProps> = ({ product, basePath, detailRoute }) => {
  const { cart, addToCart } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();

  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || "");

  // Check if product is already in cart or wishlist
  const isInCart = cart.some((item) => item.id === product.id);
  const isWishlisted = isInWishlist(product.id);

  // Generate product detail route dynamically
  const getProductDetailRoute = () => {
    const gender = product.gender ?? "mens";
    return detailRoute ?? `${basePath ?? `/${gender}`}/product/${product.id}`;
  };

  const handleViewDetails = () => navigate(getProductDetailRoute());

  const getPrimaryImage = () => product.images?.[selectedColor]?.[0] || "";

  const isBestSeller = Boolean(
    product.isBestseller ||
    product.bestseller ||
    (Array.isArray(product.tag) &&
      product.tag.some((t) => String(t).toLowerCase() === "bestseller"))
  );

  return (
    <Card className="group relative rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col h-[520px]">
      {/* Bestseller Ribbon */}
      {isBestSeller && (
        <RibbonTag label="Bestseller" className="right-[-5px] top-[10px]" />
      )}

      {/* Wishlist Button */}
      <button
        className="absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        aria-label="Toggle wishlist"
      >
        <Heart
          className={`h-5 w-5 transition ${isWishlisted ? "text-red-500" : "text-gray-500 group-hover:text-red-500"
            }`}
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
            alt={`${product.name} - ${selectedColor}`}
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-300"
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            onLoad={() => setImageLoading(false)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
            <ImageOff className="h-16 w-16 mb-2" />
            <p className="text-sm">Image not available</p>
          </div>
        )}
      </CardContent>

      {/* Product Info */}
      <CardHeader className="p-5 pb-2 flex-1">
        <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-black transition">
          {product.name}
        </CardTitle>

        <div className="flex items-center gap-1 mb-2">
          {renderStars(product.rating)}
        </div>

        <CardDescription className="line-clamp-2 text-gray-500">
          {product.description ?? "Premium quality product, designed for everyday comfort."}
        </CardDescription>
      </CardHeader>

      {/* Color Selector */}
      {product.colors && product.colors.length > 0 && (
        <div className="px-5 pb-2 flex gap-2">
          {product.colors.map((color) => (
            <button
              key={color}
              className={`w-4 h-4 rounded-full border ${selectedColor === color
                  ? "ring-1 ring-black border-s-emerald-50"
                  : "border-gray-300"
                }`}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(color);
              }}
              aria-label={`Select ${color}`}
            />
          ))}
        </div>
      )}

      {/* Price and Add to Cart */}
      <CardFooter className="flex flex-col gap-4 p-5 pt-0 mt-auto">
        <div className="flex items-center gap-2">
          {product.discountPrice && (
            <span className="text-lg font-bold text-primary">₹{product.discountPrice}</span>
          )}
          <span
            className={`text-xl font-bold ${product.discountPrice ? "line-through text-gray-400" : "text-gray-900"
              }`}
          >
            ₹{product.price}
          </span>
        </div>

        <AppButton
          className={`w-full py-3 rounded-xl font-medium flex items-center justify-center gap-2 ${isInCart
              ? "bg-muted cursor-not-allowed text-muted-foreground"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
            } transition-colors duration-300 shadow-md hover:shadow-lg`}
          onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
            e.stopPropagation();
            if (!isInCart) addToCart(product);
          }}
        >
          {isInCart ? (
            <>
              <Check className="w-5 h-5" /> Added
            </>
          ) : (
            <>
              <ShoppingBag className="w-5 h-5" /> ADD TO BAG
            </>
          )}
        </AppButton>
      </CardFooter>
    </Card>
  );
};

export default AppProductCard;
