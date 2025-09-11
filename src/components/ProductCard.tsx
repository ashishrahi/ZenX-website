import React, { FC } from "react";
import { useNavigate } from "react-router-dom";
import { Heart } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useCart } from "@/context/CartContext";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    description?: string;
    price: number;
    discountPrice?: number;
    images: { [key: string]: string[] };
    colors?: string[];
    category?: string;
    trending?: boolean;
    bestSeller?: boolean;
  };
  onWishlistToggle?: (productId: number) => void;
}

const ProductCard: FC<ProductCardProps> = ({ product, onWishlistToggle }) => {
  const navigate = useNavigate();
  const { addToCart, cart } = useCart();

  const handleViewDetails = () => navigate(`/product/${product.id}`);

  const isInCart = cart.some((item) => item.id === product.id);

  return (
    <Card className="group relative rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300">
      {product.trending && !product.bestSeller && (
        <div className="absolute top-3 left-0 z-20 overflow-visible">
          <div className="bg-red-500 text-white text-xs font-bold px-3 py-1 transform -rotate-45 shadow-lg">
            Trending
          </div>
        </div>
      )}
      {product.bestSeller && (
        <div className="absolute top-3 left-0 z-30 overflow-visible">
          <div className="bg-yellow-500 text-white text-xs font-bold px-3 py-1 transform -rotate-45 shadow-lg">
            Best Seller
          </div>
        </div>
      )}
      <button
        className="absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
        onClick={() => onWishlistToggle?.(product.id)}
      >
        <Heart className="h-5 w-5 text-gray-500 group-hover:text-red-500 transition" />
      </button>
      <CardContent
        className="relative bg-gray-50 flex items-center justify-center h-80 cursor-pointer p-0 rounded-2xl overflow-hidden"
        onClick={handleViewDetails}
      >
        <img
          src={product.images.Burgundy || ""}
          alt={product.name}
          className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
        />
      </CardContent>
      <CardHeader className="p-5 pb-2">
        {product.colors?.length && (
          <div className="flex items-center gap-2 mb-3">
            {product.colors.map((color, idx) => (
              <div
                key={idx}
                className="w-5 h-5 rounded-full border border-gray-300 hover:scale-110 transition-transform cursor-pointer shadow-sm"
                style={{ backgroundColor: color }}
              />
            ))}
          </div>
        )}
        <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-1 group-hover:text-black transition">
          {product.name}
        </CardTitle>
        <CardDescription className="line-clamp-2 text-gray-500">
          {product.description || "Premium quality product, designed for everyday comfort."}
        </CardDescription>
      </CardHeader>
      <CardFooter className="flex flex-col gap-4 p-5 pt-0">
        <div className="flex items-center gap-2">
          {product.discountPrice && (
            <span className="text-lg font-bold text-primary">₹{product.discountPrice}</span>
          )}
          <span className={`text-xl font-bold text-gray-900 ${product.discountPrice ? "line-through text-gray-400" : ""}`}>
            ₹{product.price}
          </span>
        </div>
        <Button
          className={`w-full py-3 rounded-xl font-medium ${isInCart ? "bg-gray-400 cursor-not-allowed" : "bg-black text-white hover:bg-gray-800"} transition-colors duration-300 shadow-md hover:shadow-lg`}
          onClick={() => !isInCart && addToCart(product)}
        >
          {isInCart ? "Added" : "ADD TO BAG"}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
