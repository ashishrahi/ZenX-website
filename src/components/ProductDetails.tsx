import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Images
import SweaterBurgundy from '../assets/swater.avif';
import SweaterBlack from '../assets/swater.avif';
import SweaterGrey from '../assets/swater.avif';

const ProductDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

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

  const allProducts = [
    {
      id: 7,
      name: "Regular Fit Brushed Jumper",
      price: 2299,
      colors: ["Burgundy", "Black", "Grey"],
      images: {
        Burgundy: [SweaterBurgundy],
        Black: [SweaterBlack],
        Grey: [SweaterGrey],
      },
      category: "jumper",
      description: "Classic regular fit jumper with brushed interior for comfort.",
      material: "Cotton 70%, Acrylic 30%",
      care: "Machine wash at 30°C",
      delivery: "Free delivery on orders over Rs. 1,000. Standard delivery: Rs. 50."
    },
  ];

  const product = allProducts.find(p => p.id === Number(id));
  if (!product) return <p className="text-center mt-20 text-lg">Product not found.</p>;

  const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
  const sizeGuide = {
    "XXS-S": [
      { label: "UK", values: ["28", "30R-32R", "34R-36R"] },
      { label: "EUR", values: ["38", "40-42", "44-46"] },
      { label: "Chest cm", values: ["74-78", "78-86", "86-90"] },
      { label: "Chest inch", values: ["29-30¾", "30¾-33¾", "33¾-35½"] },
      { label: "Waist cm", values: ["62-66", "66-74", "74-78"] },
      { label: "Waist inch", values: ["24½-26", "26-29¼", "29¼-30¾"] },
      { label: "Arm length cm", values: ["59", "59", "59-60"] },
      { label: "Arm length inch", values: ["23¼", "23¼", "23¼-23¾"] },
      { label: "Neckline cm", values: ["33", "34-35", "36"] },
      { label: "Neckline inch", values: ["13", "13¼-13¾", "14"] },
    ],
    "M-XL": [
      { label: "UK", values: ["38-40", "42-44", "46-48"] },
      { label: "EUR", values: ["48-50", "52-54", "56-58"] },
      { label: "Chest cm", values: ["90-96", "97-104", "105-112"] },
      { label: "Chest inch", values: ["35½-37¾", "38-41", "41-44"] },
      { label: "Waist cm", values: ["79-84", "85-92", "93-100"] },
      { label: "Waist inch", values: ["31¼-33", "33½-36", "36½-39"] },
      { label: "Arm length cm", values: ["60-61", "61-62", "62-63"] },
      { label: "Arm length inch", values: ["23¾-24", "24-24½", "24½-25"] },
      { label: "Neckline cm", values: ["37", "38-39", "40"] },
      { label: "Neckline inch", values: ["14½", "15-15¼", "15¾"] },
    ],
    "XXL-3XL": [
      { label: "UK", values: ["50-52", "54-56", "58-60"] },
      { label: "EUR", values: ["60-62", "64-66", "68-70"] },
      { label: "Chest cm", values: ["113-120", "121-128", "129-136"] },
      { label: "Chest inch", values: ["44½-47", "47½-50", "50½-53½"] },
      { label: "Waist cm", values: ["101-108", "109-116", "117-124"] },
      { label: "Waist inch", values: ["39½-42½", "43-45½", "46-49"] },
      { label: "Arm length cm", values: ["63-64", "64-65", "65-66"] },
      { label: "Arm length inch", values: ["25-25½", "25½-26", "26-26½"] },
      { label: "Neckline cm", values: ["41", "42-43", "44"] },
      { label: "Neckline inch", values: ["16", "16½-16¾", "17"] },
    ],
  };

  useEffect(() => setCurrentImage(0), [selectedColor]);

  return (
    <div className="container mx-auto px-4 pt-28 pb-12 space-y-12">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Images */}
        <div className="lg:w-1/2 flex flex-col gap-4">
          <AnimatePresence mode="wait">
            <motion.img
              key={`${selectedColor}-${currentImage}`}
              src={product.images[selectedColor][currentImage]}
              alt={product.name}
              className="w-full h-auto rounded-xl object-cover shadow-md"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4 }}
            />
          </AnimatePresence>
          <div className="flex gap-2">
            {product.images[selectedColor].map((img, idx) => (
              <motion.img
                key={idx}
                src={img}
                alt={`${product.name} ${idx}`}
                className={`w-20 h-20 object-cover rounded cursor-pointer border-2 ${
                  currentImage === idx ? "border-red-600" : "border-gray-300"
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
            <div className="flex gap-2 flex-wrap">
              {product.colors.map(color => (
                <button
                  key={color}
                  className={`
                    px-3 py-1 rounded border font-medium transition
                    ${selectedColor === color
                      ? "border-red-600 bg-red-50"
                      : "border-gray-300 hover:border-red-600 hover:bg-red-50"
                    }`}
                  onClick={() => setSelectedColor(color)}
                >
                  {color}
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
                        className={`px-3 py-1 rounded border font-medium transition ${
                          activeSizeRange === range
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
    </div>
  );
};

export default ProductDetailsPage;
