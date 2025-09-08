import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { allProducts, sizeGuide, sizes } from '../api/productsData'
import Magnifier from "@/utilis/Magnifier";


const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();

  const [selectedSize, setSelectedSize] = useState<string | null>(null);
  const [showSizeChart, setShowSizeChart] = useState(false);
  const [activeSizeRange, setActiveSizeRange] = useState<"XXS-S" | "M-XL" | "XXL-3XL">("XXS-S");
  const [selectedColor, setSelectedColor] = useState("Burgundy");
  const [currentImage, setCurrentImage] = useState(0);

  const [openSections, setOpenSections] = useState({
    description: false,
    materials: false,
    care: false,
    delivery: false,
  });

  const toggleSection = (section: keyof typeof openSections) => {
    setOpenSections(prev => ({ ...prev, [section]: !prev[section] }));
  };


  const product = allProducts.find(p => p.id === Number(id));
  if (!product) return <p className="text-center mt-20 text-lg">Product not found.</p>;



  useEffect(() => setCurrentImage(0), [selectedColor]);

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Images */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <Magnifier
            key={`${selectedColor}-${currentImage}`}
            src={product.images[selectedColor][currentImage]}
            width={500}
            height={500}
            zoomLevel={2}
            showLens={true}
            showZoomBox={true}
          />
          <div className="flex gap-2">
            {product.images[selectedColor].map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`${product.name} ${idx}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${currentImage === idx ? "border-red-600" : "border-gray-300"
                  }`}
                onMouseEnter={() => setCurrentImage(idx)}
                onClick={() => setCurrentImage(idx)}
                whileHover={{ scale: 1.1 }}
              />
            ))}
          </div>
        </div>

        {/* Details */}
        <div className="lg:w-1/2 flex flex-col gap-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>
          <p className="text-gray-500 text-sm">Save to favourites</p>
          <p className="text-red-600 text-2xl font-bold">Rs. {product.price}.00</p>
          <p className="text-gray-500 text-sm">MRP inclusive of all taxes</p>

          {/* Colour selection */}
          <div className="space-y-2">
            <p className="font-semibold">Colour: {selectedColor}</p>
            <div className="flex gap-3 flex-wrap">
              {product.colors.map((color) => (
                <button
                  key={color}
                  onClick={() => setSelectedColor(color)}
                  className={`
          flex items-center gap-2 px-3 py-2 rounded border font-medium transition
          ${selectedColor === color
                      ? "border-red-600 bg-red-50"
                      : "border-gray-300 hover:border-red-600 hover:bg-red-50"
                    }`}
                >
                  {/* Small product image for the color */}
                  <img
                    src={product.images[color][0]} // first image for that color
                    alt={`${color} preview`}
                    className="w-16 h-16 rounded object-cover border"
                  />
                  <span>{color}</span>
                </button>
              ))}
            </div>
          </div>


          {/* Size selection */}
          <div className="space-y-2">
            <p className="font-semibold">Selected size: {selectedSize ?? "None"}</p>
            <div className="flex gap-2 flex-wrap">
              {sizes.map(size => (
                <button
                  key={size}
                  className={`
                    px-3 py-1 rounded border font-medium transition
                    ${selectedSize === size
                      ? "bg-red-600 text-white border-red-600"
                      : "bg-white text-gray-700 border-gray-300 hover:bg-red-600 hover:text-white"
                    }`}
                  onClick={() => setSelectedSize(size)}
                >
                  {size}
                </button>
              ))}
            </div>
            <button
              className="text-red-600 hover:underline text-sm"
              onClick={() => setShowSizeChart(true)}
            >
              Size Guide ?
            </button>
          </div>

          {/* Action buttons */}
          <div className="flex gap-4">
            <button className="flex-1 py-2 bg-red-500 text-white rounded font-medium hover:bg-red-700 transition">
              Add
            </button>
            <button className="flex-1 py-2 border rounded hover:bg-gray-100 font-medium">
              Find in store
            </button>
          </div>
          <button className="text-blue-600 hover:underline text-sm">
            Check availability
          </button>

          {/* Collapsible sections */}
          <div className="space-y-4">
            {["description", "materials", "care", "delivery"].map(sectionKey => {
              const labels: Record<string, string> = {
                description: "Description & Fit",
                materials: "Materials",
                care: "Care Guide",
                delivery: "Delivery and Payment",
              };
              const content: Record<string, string> = {
                description: product.description,
                materials: product.material,
                care: product.care,
                delivery: product.delivery,
              };
              return (
                <div key={sectionKey} className="border rounded">
                  <button
                    className="w-full flex justify-between items-center p-3 font-semibold"
                    onClick={() => toggleSection(sectionKey as keyof typeof openSections)}
                  >
                    {labels[sectionKey]}
                    <span>{openSections[sectionKey as keyof typeof openSections] ? "−" : "+"}</span>
                  </button>
                  <AnimatePresence>
                    {openSections[sectionKey as keyof typeof openSections] && (
                      <motion.div
                        layout
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="p-3 border-t"
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
              className="fixed top-0 right-0 w-full max-w-md h-full bg-white shadow-lg z-50"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", stiffness: 250, damping: 35 }}
            >
              <div className="h-full flex flex-col overflow-y-auto">
                <div className="flex justify-between items-center p-4 border-b">
                  <h2 className="text-lg font-bold">Size Guide</h2>
                  <button
                    className="text-gray-500 hover:text-gray-700"
                    onClick={() => setShowSizeChart(false)}
                  >
                    ×
                  </button>
                </div>
                <div className="p-4 space-y-4">
                  <div className="flex gap-2 mb-2">
                    {["XXS-S", "M-XL", "XXL-3XL"].map(range => (
                      <button
                        key={range}
                        className={`px-3 py-1 rounded border font-medium transition ${activeSizeRange === range
                          ? "bg-red-600 text-white border-red-600"
                          : "bg-white text-gray-700 border-gray-300 hover:bg-red-600 hover:text-white"
                          }`}
                        onClick={() => setActiveSizeRange(range)}
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
                          {sizeGuide[activeSizeRange][0].values.map((_, idx) => (
                            <th key={idx} className="border p-2 text-center">
                              {sizes[idx]}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {sizeGuide[activeSizeRange].map((row, idx) => (
                          <tr key={idx} className="border-t">
                            <td className="border p-2 font-medium">{row.label}</td>
                            {row.values.map((val, i) => (
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
    </>
  );
};

export default ProductDetailsPage;
