import { useState } from "react";

interface SortFilterBarProps {
  onSortChange: (sortOption: string) => void;
  onFilterChange: (filters: { price?: string; color?: string }) => void;
}

const SortFilterBar: React.FC<SortFilterBarProps> = ({ onSortChange, onFilterChange }) => {
  const [priceFilter, setPriceFilter] = useState<string>("");
  const [colorFilter, setColorFilter] = useState<string>("");

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onSortChange(e.target.value);
  };

  const handleFilterChange = () => {
    onFilterChange({ price: priceFilter, color: colorFilter });
  };

  return (
    <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
      {/* Sort Dropdown */}
      <div>
        <label className="mr-2 font-medium">Sort By:</label>
        <select
          className="border border-gray-300 rounded px-3 py-1"
          onChange={handleSortChange}
        >
          <option value="">Select</option>
          <option value="price-low-high">Price: Low to High</option>
          <option value="price-high-low">Price: High to Low</option>
          <option value="newest">Newest</option>
        </select>
      </div>

      {/* Filters */}
      <div className="flex gap-4 items-center">
        <div>
          <label className="mr-2 font-medium">Price:</label>
          <select
            className="border border-gray-300 rounded px-3 py-1"
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="0-50">$0 - $50</option>
            <option value="50-100">$50 - $100</option>
            <option value="100-200">$100 - $200</option>
          </select>
        </div>

        <div>
          <label className="mr-2 font-medium">Color:</label>
          <select
            className="border border-gray-300 rounded px-3 py-1"
            value={colorFilter}
            onChange={(e) => setColorFilter(e.target.value)}
          >
            <option value="">All</option>
            <option value="black">Black</option>
            <option value="white">White</option>
            <option value="red">Red</option>
          </select>
        </div>

        <button
          className="bg-black text-white px-4 py-1 rounded hover:bg-gray-800 transition-colors"
          onClick={handleFilterChange}
        >
          Apply
        </button>
      </div>
    </div>
  );
};

export default SortFilterBar;
