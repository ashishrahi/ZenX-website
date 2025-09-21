import React, { useState, useEffect, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Magnifier from "@/utilis/Magnifier";
import PurchaseAssistantModal from "../components/PurchaseAssistantModal";
import { useCart, CartItem } from "../context/CartContext";
import AppButton from "../components/AppComponent/AppButton";
import CollapsibleSection from "@/components/CollapsibleSection";
import {ProductDetailsProps} from '../types/productTypes'
import { SizeRange } from "@/types/SizeRange";



const AppProductDetails: React.FC<ProductDetailsProps> = ({
  product,
  sizes = ["XS", "S", "M", "L", "XL"],
  sizeGuide = {},
}) => {
  const { cart, addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<SizeRange  | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [activeSizeRange, setActiveSizeRange] = useState<"XXS-S" | "M-XL" | "XXL-3XL">("XXS-S");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentImage, setCurrentImage] = useState(0);
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  useEffect(() => {
    setCurrentImage(0);
  }, [selectedColor]);

  const colorImages = product.images[selectedColor] || [];

  const isInCart = useMemo(() => {
    return cart?.some(
      (item) =>
        item.id === product.id &&
        item.size === selectedSize &&
        Object.keys(item.images || {})[0] === selectedColor
    );
  }, [cart, product, selectedSize, selectedColor]);

  const handleAddToCart = () => {
    if (!selectedSize) {
      alert("Please select a size before adding to cart.");
      return;
    }

    const cartItem: CartItem = {
      ...product,
      quantity: 1,
      size: selectedSize,
      images: { [selectedColor]: colorImages },
    };

    addToCart(cartItem);
  };

  if (!product) {
    return <p className="text-center mt-20 text-lg text-foreground">Product not found.</p>;
  }

  return (
    <div className="min-h-screen py-1 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Images */}
          <div className="lg:w-1/2">
            <div className="flex flex-col gap-4">
              {colorImages?.length > 0 && (
                <>
                  <div className="rounded-lg p-2 md:p-4 bg-card">
                    <div className="w-full h-auto max-w-full mx-auto">
                      <Magnifier
                        key={`${selectedColor}-${currentImage}`}
                        src={colorImages[currentImage]}
                        width={500}
                        height={500}
                        zoomLevel={2}
                        showLens
                        showZoomBox
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {colorImages.map((img, idx) => (
                      <motion.img
                        key={idx}
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer border-2 ${
                          currentImage === idx ? "border-destructive" : "border-muted"
                        }`}
                        onMouseEnter={() => setCurrentImage(idx)}
                        onClick={() => setCurrentImage(idx)}
                        whileHover={{ scale: 1.05 }}
                        transition={{ duration: 0.2 }}
                      />
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {/* Details */}
          <div className="lg:w-1/2">
            <div className="rounded-xl shadow-md p-4 md:p-6 bg-card h-full">
              <div className="flex flex-col gap-4 md:gap-6">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground">{product.name}</h1>
                <p className="text-muted-foreground text-sm">Save to favourites</p>
                <p className="text-destructive text-xl md:text-2xl font-bold">Rs. {product.price}.00</p>
                <p className="text-muted-foreground text-xs md:text-sm">MRP inclusive of all taxes</p>

                {/* Color selection */}
                <div className="space-y-2">
                  <p className="font-semibold text-foreground">Colour: {selectedColor}</p>
                  <div className="flex gap-2 md:gap-3 flex-wrap">
                    {product.colors?.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-2 rounded-lg border font-medium transition
                          ${
                            selectedColor === color
                              ? "border-destructive bg-destructive/10 text-destructive"
                              : "border-muted hover:border-destructive hover:bg-destructive/10 text-foreground"
                          }`}
                        aria-label={`Select color: ${color}`}
                        aria-pressed={selectedColor === color}
                      >
                        {product.images[color]?.[0] && (
                          <img
                            src={product.images[color][0]}
                            alt={`${color} preview`}
                            className="w-12 h-12 md:w-16 md:h-16 rounded object-cover border border-muted"
                          />
                        )}
                        <span className="text-sm md:text-base">{color}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size selection */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold text-foreground">
                      Selected size: {selectedSize ?? "None"}
                    </p>
                    <button
                      className="text-destructive hover:underline text-xs md:text-sm"
                      onClick={() => setShowSizeChart(true)}
                      aria-expanded={showSizeChart}
                    >
                      Size Guide ?
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {sizes?.map((size) => (
                      <button
                        key={size}
                        className={`px-2 py-1 md:px-3 md:py-1 rounded-lg border font-medium transition
                          ${
                            selectedSize === size
                              ? "bg-destructive text-white border-destructive"
                              : "bg-card text-foreground border-muted hover:bg-destructive/10 hover:text-destructive"
                          }`}
                        onClick={() => setSelectedSize(size)}
                        aria-label={`Select size: ${size}`}
                        aria-pressed={selectedSize === size}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Action buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  {isInCart ? (
                    <AppButton
                      className="flex-1 py-2 md:py-3 bg-green-500 text-white rounded-lg font-medium cursor-not-allowed"
                      disabled
                    >
                      Added to Cart
                    </AppButton>
                  ) : (
                    <AppButton
                      className="flex-1 py-2 md:py-3 bg-destructive text-white rounded-lg font-medium hover:bg-destructive/80 transition-colors"
                      onClick={handleAddToCart}
                    >
                      ADD TO CART
                    </AppButton>
                  )}

                  <AppButton
                    className="flex-1 py-2 md:py-3 border border-muted rounded-lg hover:bg-muted/10 font-medium"
                    onClick={() => setShowPurchaseModal(true)}
                  >
                    PURCHASE ASSISTANT
                  </AppButton>
                </div>

                <button className="text-primary hover:underline text-xs md:text-sm">
                  Check availability
                </button>

                {/* Collapsible Sections */}
                <div className="space-y-3 md:space-y-4">
                  <CollapsibleSection title="Description & Fit" content={product.description ?? ""} />
                  <CollapsibleSection title="Materials" content={product.material ?? ""} />
                  <CollapsibleSection title="Care Guide" content={product.care ?? ""} />
                  <CollapsibleSection title="Delivery and Payment" content={product.delivery ?? ""} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Size Guide Drawer */}
        <AnimatePresence>
          {showSizeChart && (
            <>
              <motion.div
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={() => setShowSizeChart(false)}
              />
              <motion.div
                className="fixed top-0 right-0 w-full max-w-md h-full bg-background shadow-lg z-50"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 250, damping: 35 }}
              >
                <div className="h-full flex flex-col overflow-y-auto">
                  <div className="flex justify-between items-center p-4 border-b border-muted">
                    <h2 className="text-lg font-bold text-foreground">Size Guide</h2>
                    <button
                      className="text-muted-foreground hover:text-foreground text-2xl"
                      onClick={() => setShowSizeChart(false)}
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {["XXS-S", "M-XL", "XXL-3XL"].map((range) => (
                        <button
                          key={range}
                          className={`px-3 py-1 rounded-lg border font-medium transition
                            ${
                              activeSizeRange === range
                                ? "bg-destructive text-white border-destructive"
                                : "bg-background text-foreground border-muted hover:bg-destructive/10 hover:text-destructive"
                            }`}
                          onClick={() => setActiveSizeRange(range as SizeRange)}
                          aria-pressed={activeSizeRange === range}
                        >
                          {range}
                        </button>
                      ))}
                    </div>
                    <div className="overflow-x-auto">
                      <table className="w-full border-collapse text-sm">
                        <thead>
                          <tr>
                            <th className="border p-2 text-foreground">Measurement</th>
                            {sizeGuide[activeSizeRange]?.[0]?.values?.map((_, idx) => (
                              <th key={idx} className="border p-2 text-center text-foreground">
                                {sizes[idx]}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sizeGuide[activeSizeRange]?.map((row, idx) => (
                            <tr key={idx} className="border-t border-muted">
                              <td className="border p-2 font-medium text-foreground">{row?.label}</td>
                              {row?.values?.map((val, i) => (
                                <td key={i} className="border p-2 text-center text-foreground">
                                  {val}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
              </motion.div>
            </>
          )}
        </AnimatePresence>

        {/* Purchase Assistant Modal */}
        <PurchaseAssistantModal
          isOpen={showPurchaseModal}
          onClose={() => setShowPurchaseModal(false)}
        />
      </div>
    </div>
  );
};

export default AppProductDetails;
