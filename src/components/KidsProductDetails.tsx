import React, { useState, useEffect, useMemo } from "react";
import { useParams } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { kidsInnerwear, sizeGuide, sizes } from "../api/kids/kidsProductsData";
import Magnifier from "@/utilis/Magnifier";
import PurchaseAssistantModal from "../components/PurchaseAssistantModal";
import { useCart, CartItem } from "../context/CartContext";
import AppButton from "./AppButton";

const KidsProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const { cart, addToCart } = useCart();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [activeSizeRange, setActiveSizeRange] = useState<"XXS-S" | "M-XL" | "XXL-3XL">("XXS-S");
  const [selectedColor, setSelectedColor] = useState<string>("");
  const [currentImage, setCurrentImage] = useState(0);
  const [openSections, setOpenSections] = useState({
    description: false,
    materials: false,
    care: false,
    delivery: false,
  });
  const [showPurchaseModal, setShowPurchaseModal] = useState(false);

  // Find the product using useMemo to prevent unnecessary recalculations
  const product = useMemo(() => {
    return kidsInnerwear?.find((p) => p?.id === Number(id));
  }, [id]);

  // Set initial color when product is available
  useEffect(() => {
    if (product && product.colors && product.colors.length > 0) {
      setSelectedColor(product.colors[0]);
    }
  }, [product]);

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  if (!product) {
    return <p className="text-center mt-20 text-lg">Product not found.</p>;
  }

  // Reset image when color changes
  useEffect(() => {
    setCurrentImage(0);
  }, [selectedColor]);

  // Get available images for selected color
  const colorImages = product.images[selectedColor] || [];

  // Check if the selected product variant is already in the cart
  const isInCart = useMemo(() => {
    return cart?.some(
      (item) =>
        item?.id === product?.id &&
        item?.size === selectedSize &&
        Object.keys(item?.images || {})[0] === selectedColor
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

  return (
    <div className="min-h-screen py-1">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col lg:flex-row gap-4 md:gap-8">
          {/* Images Section */}
          <div className="lg:w-1/2">
            <div className="flex flex-col gap-4">
              {colorImages.length > 0 && (
                <>
                  <div className="rounded-lg p-2 md:p-4">
                    <div className="w-full h-auto max-w-full mx-auto">
                      <Magnifier
                        key={`${selectedColor}-${currentImage}`}
                        src={colorImages[currentImage]}
                        width={500}
                        height={500}
                        zoomLevel={2}
                        showLens
                        showZoomBox
                        style={{
                          borderRadius: '8px',
                          overflow: 'hidden',
                          maxWidth: '100%',
                          height: 'auto'
                        }}
                      />
                    </div>
                  </div>
                  <div className="flex gap-2 overflow-x-auto py-2">
                    {colorImages.map((img, idx) => (
                      <motion.img
                        key={idx}
                        src={img}
                        alt={`${product.name} view ${idx + 1}`}
                        className={`w-16 h-16 md:w-20 md:h-20 object-cover rounded-lg cursor-pointer border-2 ${currentImage === idx ? "border-red-600" : "border-gray-300"
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

          {/* Details Section */}
          <div className="lg:w-1/2">
            <div className="rounded-xl shadow-md p-4 md:p-6 h-full">
              <div className="flex flex-col gap-4 md:gap-6">
                <h1 className="text-2xl md:text-3xl font-bold">{product.name}</h1>
                <p className="text-gray-500 text-sm">Save to favourites</p>
                <p className="text-red-600 text-xl md:text-2xl font-bold">Rs. {product.price}.00</p>
                <p className="text-gray-500 text-xs md:text-sm">MRP inclusive of all taxes</p>

                {/* Colour Selection */}
                <div className="space-y-2">
                  <p className="font-semibold">Colour: {selectedColor}</p>
                  <div className="flex gap-2 md:gap-3 flex-wrap">
                    {product.colors?.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`flex items-center gap-1 md:gap-2 px-2 py-1 md:px-3 md:py-2 rounded-lg border font-medium transition ${selectedColor === color
                            ? "border-red-600 bg-red-50"
                            : "border-gray-300 hover:border-red-600 hover:bg-red-50"
                          }`}
                        aria-label={`Select color: ${color}`}
                        aria-pressed={selectedColor === color}
                      >
                        {product.images[color] && product.images[color][0] && (
                          <img
                            src={product.images[color][0]}
                            alt={`${color} preview`}
                            className="w-12 h-12 md:w-16 md:h-16 rounded object-cover border"
                          />
                        )}
                        <span className="text-sm md:text-base">{color}</span>
                      </button>
                    ))}
                  </div>
                </div>

                {/* Size Selection */}
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <p className="font-semibold">Selected size: {selectedSize ?? "None"}</p>
                    <button
                      className="text-red-600 hover:underline text-xs md:text-sm"
                      onClick={() => setShowSizeChart(true)}
                      aria-expanded={showSizeChart}
                    >
                      Size Guide ?
                    </button>
                  </div>
                  <div className="flex gap-2 flex-wrap">
                    {sizes.map((size) => (
                      <button
                        key={size}
                        className={`px-2 py-1 md:px-3 md:py-1 rounded-lg border font-medium transition ${selectedSize === size
                            ? "bg-red-600 text-white border-red-600"
                            : "bg-white text-gray-700 border-gray-300 hover:bg-red-600 hover:text-white"
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

                {/* Action Buttons */}
                <div className="flex flex-col sm:flex-row gap-3 md:gap-4">
                  {isInCart ? (
                    <AppButton
                      className="flex-1 py-2 md:py-3 bg-green-500 text-white rounded-lg font-medium cursor-not-allowed"
                      disabled
                      aria-label="Item already in cart"
                    >
                      Added to Cart
                    </AppButton>
                  ) : (
                    <AppButton
                      className="flex-1 py-2 md:py-3 bg-red-500 text-white rounded-lg font-medium hover:bg-red-700 transition"
                      onClick={handleAddToCart}
                      aria-label="Add to cart"
                    >
                      ADD TO CART
                    </AppButton>
                  )}

                  <AppButton
                    className="flex-1 py-2 md:py-3 border border-gray-300 rounded-lg hover:bg-gray-100 font-medium"
                    onClick={() => setShowPurchaseModal(true)}
                    aria-label="Open purchase assistant"
                  >
                    PURCHASE ASSISTANT
                  </AppButton>
                </div>

                <button className="text-blue-600 hover:underline text-xs md:text-sm">
                  Check availability
                </button>

                {/* Collapsible Sections */}
                <div className="space-y-3 md:space-y-4">
                  {["description", "materials", "care", "delivery"].map((sectionKey) => {
                    const labels: Record<string, string> = {
                      description: "Description & Fit",
                      materials: "Materials",
                      care: "Care Guide",
                      delivery: "Delivery and Payment",
                    };

                    const content: Record<string, string> = {
                      description: product.description ?? "",
                      materials: product.material ?? "",
                      care: product.care ?? "",
                      delivery: product.delivery ?? "",
                    };

                    return (
                      <div key={sectionKey} className="border border-gray-200 rounded-lg">
                        <button
                          className="w-full flex justify-between items-center p-3 md:p-4 font-semibold text-sm md:text-base"
                          onClick={() => toggleSection(sectionKey as keyof typeof openSections)}
                          aria-expanded={openSections[sectionKey as keyof typeof openSections]}
                          aria-controls={`${sectionKey}-content`}
                        >
                          {labels[sectionKey]}
                          <span>{openSections[sectionKey as keyof typeof openSections] ? "−" : "+"}</span>
                        </button>
                        <AnimatePresence>
                          {openSections[sectionKey as keyof typeof openSections] && (
                            <motion.div
                              id={`${sectionKey}-content`}
                              layout
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              transition={{ duration: 0.3 }}
                              className="p-3 md:p-4 border-t border-gray-200 overflow-hidden text-sm md:text-base"
                            >
                              {content[sectionKey]}
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>
                    );
                  })}
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
                aria-hidden="true"
              />
              <motion.div
                className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50"
                initial={{ x: "100%" }}
                animate={{ x: 0 }}
                exit={{ x: "100%" }}
                transition={{ type: "spring", stiffness: 250, damping: 35 }}
                role="dialog"
                aria-modal="true"
                aria-labelledby="size-guide-title"
              >
                <div className="h-full flex flex-col overflow-y-auto">
                  <div className="flex justify-between items-center p-4 border-b">
                    <h2 id="size-guide-title" className="text-lg font-bold">Size Guide</h2>
                    <button
                      className="text-gray-500 hover:text-gray-700 text-2xl"
                      onClick={() => setShowSizeChart(false)}
                      aria-label="Close size guide"
                    >
                      ×
                    </button>
                  </div>
                  <div className="p-4 space-y-4">
                    <div className="flex gap-2 mb-2 flex-wrap">
                      {["XXS-S", "M-XL", "XXL-3XL"].map((range) => (
                        <button
                          key={range}
                          className={`px-3 py-1 rounded-lg border font-medium transition ${activeSizeRange === range
                              ? "bg-red-600 text-white border-red-600"
                              : "bg-white text-gray-700 border-gray-300 hover:bg-red-600 hover:text-white"
                            }`}
                          onClick={() => setActiveSizeRange(range as any)}
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
                            <th className="border p-2">Measurement</th>
                            {sizeGuide[activeSizeRange]?.[0]?.values?.map((_, idx) => (
                              <th key={idx} className="border p-2 text-center">
                                {sizes[idx]}
                              </th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {sizeGuide[activeSizeRange]?.map((row, idx) => (
                            <tr key={idx} className="border-t">
                              <td className="border p-2 font-medium">{row?.label}</td>
                              {row?.values?.map((val, i) => (
                                <td key={i} className="border p-2 text-center">
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

export default KidsProductDetails;
