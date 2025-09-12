import React from "react";
import { Heart, ImageOff } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { useWishlist } from "@/context/WishlistContext";

const Wishlist: React.FC = () => {
  const { wishlist, toggleWishlist } = useWishlist();

  if (wishlist?.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center mt-20">
        <Heart size={64} className="text-gray-400 mb-4 animate-pulse" />
        <h2 className="text-2xl font-semibold mb-2">My Wishlist</h2>
        <p className="text-gray-500">Your wishlist is empty.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 p-6">
      {wishlist?.map((product) => {
        // Get primary image
        const getPrimaryImage = () => {
          const images = product?.images;
          if (!images || Object.keys(images).length === 0) return "";
          const firstColor = Object.keys(images)[0];
          if (images[firstColor]?.[0]) return images[firstColor][0];
          for (const color in images) {
            if (images[color]?.[0]) return images[color][0];
          }
          return "";
        };

        return (
          <Card key={product?.id} className="relative rounded-2xl border shadow-sm hover:shadow-lg transition-all duration-300 flex flex-col">
            {/* Wishlist Remove Button */}
            <button
              className="absolute top-3 right-3 z-20 bg-white p-2 rounded-full shadow hover:bg-red-50 transition"
              onClick={() => toggleWishlist(product)}
            >
              <Heart className="h-5 w-5 text-red-500" />
            </button>

            {/* Product Image */}
            <CardContent className="relative bg-gray-50 flex items-center justify-center h-64 p-0 rounded-2xl overflow-hidden">
              {getPrimaryImage() ? (
                <img
                  src={getPrimaryImage()}
                  alt={product?.name}
                  className="w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-300"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-gray-400 h-full w-full">
                  <ImageOff className="h-16 w-16 mb-2" />
                  <p className="text-sm">Image not available</p>
                </div>
              )}
            </CardContent>

            {/* Product Details */}
            <CardHeader className="p-4 pb-2">
              <CardTitle className="text-lg font-semibold text-gray-800 line-clamp-1">{product?.name}</CardTitle>
              <CardDescription className="line-clamp-2 text-gray-500">
                {product?.description ?? "Premium quality product, designed for everyday comfort."}
              </CardDescription>
            </CardHeader>

            {/* Price */}
            <CardFooter className="p-4 pt-0 mt-auto">
              <div className="flex items-center gap-2">
                {product?.discountPrice && <span className="text-lg font-bold text-primary">₹{product.discountPrice}</span>}
                <span className={`text-xl font-bold text-gray-900 ${product?.discountPrice ? "line-through text-gray-400" : ""}`}>
                  ₹{product?.price}
                </span>
              </div>
            </CardFooter>
          </Card>
        );
      })}
    </div>
  );
};

export default Wishlist;
