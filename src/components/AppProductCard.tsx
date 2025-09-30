import { FC, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Check, Heart, ImageOff, ShoppingBag, Plus, Minus } from "lucide-react";
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
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { ProductCardProps } from "@/types/IproductTypes";

const AppProductCard: FC<ProductCardProps> = ({ product, basePath, detailRoute }) => {
  const { cart, addToCart, updateQuantity } = useCart();
  const { toggleWishlist, isInWishlist } = useWishlist();
  const navigate = useNavigate();
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [selectedColor, setSelectedColor] = useState<string>(product.colors?.[0] || "");

  // Find cart item by product ID (since your context doesn't track colors separately)
  const cartItem = cart.find((item) => item._id === product._id);
  const isInCart = !!cartItem;
  const currentQuantity = cartItem?.quantity || 1;
  const isWishlisted = isInWishlist(product._id);

  // Generate product detail route dynamically
  const getProductDetailRoute = () => detailRoute ?? `/category/${product.category}/product/${product.slug}`;
  const handleViewDetails = () => navigate(getProductDetailRoute());

  const getPrimaryImage = () => {
    if (selectedColor && product.images[selectedColor]) {
      return product.images[selectedColor][0];
    }
    const firstColor = product.colors?.[0];
    return firstColor ? product.images[firstColor][0] : "";
  };

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleIncreaseQuantity = () => {
    if (cartItem) {
      updateQuantity(product._id, currentQuantity + 1);
    }
  };

  const handleDecreaseQuantity = () => {
    if (cartItem && currentQuantity > 1) {
      updateQuantity(product._id, currentQuantity - 1);
    }
  };

  return (
    <Card className="group relative rounded-2xl border border-gray-200 shadow-sm hover:shadow-md transition-all duration-300 flex flex-col h-[480px] bg-white">

      {/* Wishlist Button */}
      <button
        className="absolute top-3 right-3 z-20 bg-white/80 backdrop-blur-sm p-2 rounded-full shadow-sm hover:bg-white transition-all duration-200"
        onClick={(e) => {
          e.stopPropagation();
          toggleWishlist(product);
        }}
        aria-label="Toggle wishlist"
      >
        <Heart
          className={`h-4 w-4 transition ${
            isWishlisted
              ? "fill-red-500 text-red-500"
              : "text-gray-400 group-hover:text-gray-600"
          }`}
        />
      </button>

      {/* Product Image */}
      <CardContent
        className="relative flex items-center justify-center h-72 cursor-pointer p-0 rounded-t-2xl overflow-hidden bg-gray-50"
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
            className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
            onError={() => {
              setImageError(true);
              setImageLoading(false);
            }}
            onLoad={() => setImageLoading(false)}
          />
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
            <ImageOff className="h-12 w-12 mb-2" />
            <p className="text-sm">Image not available</p>
          </div>
        )}
      </CardContent>

      {/* Product Info */}
      <CardHeader className="p-4 pb-2 flex-1 space-y-1">
        <CardTitle className="text-base font-medium text-gray-900 line-clamp-1">
          {product.name}
        </CardTitle>
        <CardDescription className="text-xs text-gray-500 line-clamp-2">
          {product.description || "100% Cotton Oversized Textured T-Shirt"}
        </CardDescription>
        
        {/* Rating */}
        <div className="flex items-center gap-1 mt-1">
          {renderStars(product.rating)}
        </div>
      </CardHeader>

      {/* Color Selector - Visual only since cart doesn't track colors */}
      {product.colors && product.colors.length > 0 && (
        <div className="px-4 pb-3 flex gap-1.5">
          {product.colors.map((color) => (
            <button
              key={color}
              className={`w-3 h-3 rounded-full border ${
                selectedColor === color
                  ? "ring-1 ring-gray-400 border-white"
                  : "border-gray-200"
              }`}
              style={{ backgroundColor: color.toLowerCase() }}
              onClick={(e) => {
                e.stopPropagation();
                setSelectedColor(color);
                setImageError(false);
                setImageLoading(true);
              }}
              aria-label={`Select ${color}`}
            />
          ))}
        </div>
      )}

      {/* Price and Add to Cart */}
      <CardFooter className="flex flex-col gap-3 p-4 pt-0 mt-auto">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-baseline gap-2">
            <span className="text-lg font-bold text-gray-900">
              ₹{product.discountPrice || product.price}
            </span>
            {product.discountPrice && (
              <span className="text-sm text-gray-500 line-through">
                ₹{product.price}
              </span>
            )}
          </div>
          
          {/* Quantity display when in cart */}
          {isInCart && (
            <div className="flex items-center text-xs text-green-600">
              <Check className="w-3 h-3 mr-1" />
              {currentQuantity} in bag
            </div>
          )}
        </div>

        {/* Add to Cart / Quantity Controls */}
        {!isInCart ? (
          <AppButton
            className="w-full py-2.5 rounded-lg font-medium flex items-center justify-center gap-2 bg-red-700 text-white hover:bg-gray-800 border border-gray-900 transition-all duration-200 shadow-sm hover:shadow-md"
            onClick={(e) => {
              e.stopPropagation();
              handleAddToCart();
            }}
          >
            <ShoppingBag className="w-4 h-4" /> ADD TO BAG
          </AppButton>
        ) : (
          <div className="flex items-center justify-between w-full bg-gray-50 rounded-lg border border-gray-200 p-1">
            <button
              className="flex items-center justify-center w-8 h-8 rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={(e) => {
                e.stopPropagation();
                handleDecreaseQuantity();
              }}
              disabled={currentQuantity <= 1}
              aria-label="Decrease quantity"
            >
              <Minus className="w-3 h-3" />
            </button>
            
            <span className="text-sm font-medium text-gray-900 min-w-8 text-center">
              {currentQuantity}
            </span>
            
            <button
              className="flex items-center justify-center w-8 h-8 rounded-md bg-white border border-gray-300 hover:bg-gray-100 transition-colors duration-200"
              onClick={(e) => {
                e.stopPropagation();
                handleIncreaseQuantity();
              }}
              aria-label="Increase quantity"
            >
              <Plus className="w-3 h-3" />
            </button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
};

export default AppProductCard;