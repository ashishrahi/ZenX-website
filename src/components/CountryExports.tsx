// src/components/CountryExports.tsx
import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { DollarSign, Box, Star, Users, Calendar, ArrowLeft } from "lucide-react";
import ColoredTitle from "./ColoredTitle";

export interface ExportData {
  country?: string;
  countryCode?: string;
  volume?: string;
  value?: number;
  category?: string;
  flag?: string;
  coordinates?: [number, number];
}

export interface ProductDetail {
  id: string;
  name: string;
  category: string;
  qualityRating: number;
  customerReviews: number;
  exportVolume: string;
  priceRange: string;
  materials: string[];
  lastShipment: string;
  description: string;
}

interface CountryExportsProps {
  exportData?: ExportData[];
  productDetails?: Record<string, ProductDetail[]>;
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

// Dummy product data for different countries
const dummyProductDetails: Record<string, ProductDetail[]> = {
  "USA": [
    {
      id: "1",
      name: "Premium Cotton Underwear",
      category: "Basic Underwear",
      qualityRating: 4.5,
      customerReviews: 234,
      exportVolume: "50,000 units",
      priceRange: "$15-25",
      materials: ["Organic Cotton", "Spandex", "Modal"],
      lastShipment: "2024-01-15",
      description: "High-quality cotton underwear with excellent breathability and comfort for daily wear."
    },
    {
      id: "2",
      name: "Luxury Silk Lingerie Set",
      category: "Lingerie",
      qualityRating: 4.8,
      customerReviews: 189,
      exportVolume: "25,000 units",
      priceRange: "$45-85",
      materials: ["Pure Silk", "French Lace", "Nylon"],
      lastShipment: "2024-01-10",
      description: "Elegant silk lingerie set with intricate lace details and premium finish."
    },
    {
      id: "3",
      name: "Sports Performance Boxers",
      category: "Sports Underwear",
      qualityRating: 4.3,
      customerReviews: 156,
      exportVolume: "35,000 units",
      priceRange: "$20-35",
      materials: ["Moisture-wicking Fabric", "Polyester", "Elastane"],
      lastShipment: "2024-01-12",
      description: "Performance-focused boxers designed for athletic activities with maximum comfort."
    }
  ],
  "GER": [
    {
      id: "4",
      name: "German Engineered Boxer Briefs",
      category: "Men's Underwear",
      qualityRating: 4.7,
      customerReviews: 312,
      exportVolume: "75,000 units",
      priceRange: "$25-40",
      materials: ["Microfiber", "Bamboo Viscose", "Elastane"],
      lastShipment: "2024-01-14",
      description: "Precision-engineered boxer briefs with superior support and durability."
    },
    {
      id: "5",
      name: "Eco-Friendly Bralette",
      category: "Women's Lingerie",
      qualityRating: 4.4,
      customerReviews: 278,
      exportVolume: "45,000 units",
      priceRange: "$30-50",
      materials: ["Recycled Polyester", "Organic Cotton", "Eco-Lace"],
      lastShipment: "2024-01-08",
      description: "Sustainable bralette made from eco-friendly materials with comfortable support."
    }
  ],
  "GBR": [
    {
      id: "6",
      name: "Classic British Briefs",
      category: "Men's Underwear",
      qualityRating: 4.6,
      customerReviews: 198,
      exportVolume: "40,000 units",
      priceRange: "$18-30",
      materials: ["Egyptian Cotton", "Lycra", "Modal"],
      lastShipment: "2024-01-11",
      description: "Traditional British-style briefs with exceptional comfort and classic design."
    },
    {
      id: "7",
      name: "Royal Collection Chemise",
      category: "Nightwear",
      qualityRating: 4.9,
      customerReviews: 145,
      exportVolume: "15,000 units",
      priceRange: "$55-95",
      materials: ["Silk Satin", "Chantilly Lace", "Fine Mesh"],
      lastShipment: "2024-01-09",
      description: "Luxurious chemise from our royal collection with exquisite detailing."
    }
  ],
  "FRA": [
    {
      id: "8",
      name: "Parisian Lace Bra Set",
      category: "Lingerie",
      qualityRating: 4.8,
      customerReviews: 267,
      exportVolume: "30,000 units",
      priceRange: "$50-90",
      materials: ["French Leavers Lace", "Silk", "Georgette"],
      lastShipment: "2024-01-13",
      description: "Authentic Parisian lace bra set with romantic design and superior fit."
    },
    {
      id: "9",
      name: "Provence Cotton Panties",
      category: "Women's Underwear",
      qualityRating: 4.2,
      customerReviews: 189,
      exportVolume: "60,000 units",
      priceRange: "$12-20",
      materials: ["Provence Cotton", "Elastane", "Microfiber"],
      lastShipment: "2024-01-07",
      description: "Comfortable cotton panties inspired by the colors of Provence."
    }
  ],
  "JPN": [
    {
      id: "10",
      name: "Japanese Tech Underwear",
      category: "Innovative Wear",
      qualityRating: 4.7,
      customerReviews: 223,
      exportVolume: "28,000 units",
      priceRange: "$35-60",
      materials: ["Smart Fabric", "Carbon Fiber", "CoolTech"],
      lastShipment: "2024-01-16",
      description: "Advanced technology underwear with temperature regulation and odor control."
    },
    {
      id: "11",
      name: "Minimalist Seamless Set",
      category: "Women's Underwear",
      qualityRating: 4.5,
      customerReviews: 194,
      exportVolume: "42,000 units",
      priceRange: "$25-45",
      materials: ["Seamless Fabric", "Nylon", "Spandex"],
      lastShipment: "2024-01-10",
      description: "Minimalist seamless underwear set designed for invisible comfort under clothing."
    }
  ]
};

// Dummy export data
const dummyExportData: ExportData[] = [
  {
    country: "United States",
    countryCode: "USA",
    volume: "$4.2M",
    value: 4200000,
    category: "Premium Lingerie",
    flag: "🇺🇸",
    coordinates: [-95.7129, 37.0902]
  },
  {
    country: "Germany",
    countryCode: "GER",
    volume: "$3.8M",
    value: 3800000,
    category: "Men's Underwear",
    flag: "🇩🇪",
    coordinates: [10.4515, 51.1657]
  },
  {
    country: "United Kingdom",
    countryCode: "GBR",
    volume: "$2.9M",
    value: 2900000,
    category: "Classic Wear",
    flag: "🇬🇧",
    coordinates: [-3.4360, 55.3781]
  },
  {
    country: "France",
    countryCode: "FRA",
    volume: "$2.1M",
    value: 2100000,
    category: "Luxury Lingerie",
    flag: "🇫🇷",
    coordinates: [2.2137, 46.2276]
  },
  {
    country: "Japan",
    countryCode: "JPN",
    volume: "$1.5M",
    value: 1500000,
    category: "Tech Wear",
    flag: "🇯🇵",
    coordinates: [138.2529, 36.2048]
  },
  {
    country: "Canada",
    countryCode: "CAN",
    volume: "$800K",
    value: 800000,
    category: "Basic Wear",
    flag: "🇨🇦",
    coordinates: [-106.3468, 56.1304]
  },
  {
    country: "Australia",
    countryCode: "AUS",
    volume: "$600K",
    value: 600000,
    category: "Sports Wear",
    flag: "🇦🇺",
    coordinates: [133.7751, -25.2744]
  }
];

const CountryExports: React.FC<CountryExportsProps> = ({ 
  exportData = dummyExportData, 
  productDetails = dummyProductDetails 
}) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [mapScale, setMapScale] = useState(140);
  const [selectedCountry, setSelectedCountry] = useState<ExportData | null>(null);
  const [countryProducts, setCountryProducts] = useState<ProductDetail[]>([]);

  useEffect(() => {
    const updateScale = () => {
      if (window.innerWidth < 768) setMapScale(100);
      else if (window.innerWidth < 1024) setMapScale(120);
      else setMapScale(140);
    };
    window.addEventListener("resize", updateScale);
    updateScale();
    return () => window.removeEventListener("resize", updateScale);
  }, []);

  const handleCountryClick = (country: ExportData) => {
    setSelectedCountry(country);
    const products = productDetails[country.countryCode || ""] || [];
    setCountryProducts(products);
  };

  const handleBackToMap = () => {
    setSelectedCountry(null);
    setCountryProducts([]);
  };

  const getFillColor = (value?: number) => {
    if (!value) return "#34d399";
    if (value > 4000000) return "#065f46";
    if (value > 2000000) return "#059669";
    if (value > 1000000) return "#10b981";
    return "#34d399";
  };

  const renderStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[1, 2, 3, 4, 5].map((star) => (
          <Star
            key={star}
            className={`w-4 h-4 ${
              star <= rating ? "text-yellow-500 fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
        <span className="text-sm text-gray-600 ml-1">({rating.toFixed(1)})</span>
      </div>
    );
  };

  if (!exportData?.length) {
    return (
      <div className="text-center p-10 text-gray-500">
        No export data available.
      </div>
    );
  }

  // Product Details View
  if (selectedCountry) {
    return (
      <section className="max-w-7xl mx-auto p-4">
        <div className="flex items-center gap-4 mb-6">
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToMap}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Map
          </Button>
          <h1 className="text-4xl font-bold text-foreground">
            <ColoredTitle title={`${selectedCountry.flag} ${selectedCountry.country} - Product Details`} />
          </h1>
        </div>

        {/* Country Summary */}
        <Card className="mb-6">
          <CardContent className="p-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 text-center">
              <div>
                <p className="text-sm text-gray-500">Total Export Value</p>
                <p className="text-2xl font-bold text-green-600">{selectedCountry.volume}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Main Category</p>
                <p className="text-xl font-semibold">{selectedCountry.category}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Products</p>
                <p className="text-2xl font-bold text-blue-600">{countryProducts.length}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Quality Average</p>
                <p className="text-xl font-semibold text-yellow-600">
                  {countryProducts.length > 0 
                    ? (countryProducts.reduce((acc, product) => acc + product.qualityRating, 0) / countryProducts.length).toFixed(1)
                    : 'N/A'
                  }/5
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Product Grid */}
        {countryProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {countryProducts.map((product) => (
              <Card key={product.id} className="hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <CardTitle className="text-lg">{product.name}</CardTitle>
                    <Badge variant="secondary">{product.category}</Badge>
                  </div>
                  {renderStars(product.qualityRating)}
                </CardHeader>
                <CardContent className="space-y-3">
                  <p className="text-sm text-gray-600">{product.description}</p>
                  
                  <div className="grid grid-cols-2 gap-2 text-sm">
                    <div className="flex items-center gap-1">
                      <DollarSign className="w-4 h-4 text-green-600" />
                      <span>{product.priceRange}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Box className="w-4 h-4 text-blue-600" />
                      <span>{product.exportVolume}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Users className="w-4 h-4 text-purple-600" />
                      <span>{product.customerReviews} reviews</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Calendar className="w-4 h-4 text-orange-600" />
                      <span>{product.lastShipment}</span>
                    </div>
                  </div>

                  <div>
                    <p className="text-sm font-medium mb-1">Materials:</p>
                    <div className="flex flex-wrap gap-1">
                      {product.materials.map((material, index) => (
                        <Badge key={index} variant="outline" className="text-xs">
                          {material}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <div className="pt-2">
                    <div className="flex justify-between items-center text-sm">
                      <span className="font-medium">Quality Score:</span>
                      <span className={`font-bold ${
                        product.qualityRating >= 4.5 ? 'text-green-600' : 
                        product.qualityRating >= 4 ? 'text-yellow-600' : 'text-red-600'
                      }`}>
                        {product.qualityRating}/5
                      </span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        ) : (
          <Card>
            <CardContent className="p-8 text-center">
              <Box className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-600 mb-2">
                No Product Details Available
              </h3>
              <p className="text-gray-500">
                No detailed product information is available for {selectedCountry.country} at this time.
              </p>
            </CardContent>
          </Card>
        )}
      </section>
    );
  }

  // Main Map View
  return (
    <section className="max-w-7xl mx-auto p-4">
      <h1 className="text-4xl font-bold mb-3 text-foreground text-center">
        <ColoredTitle title="Innerwear Exports" />
      </h1>

      <div className="flex flex-col lg:flex-row gap-6 items-start">
        {/* Map */}
        <Card className="flex-1 p-3 hover:shadow-lg transition duration-300">
          <CardHeader>
            <CardTitle className="text-lg">Export Value Map</CardTitle>
          </CardHeader>
          <CardContent>
            <ComposableMap projectionConfig={{ scale: mapScale }}>
              <Geographies geography={geoUrl}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const countryData = exportData?.find(c => c?.countryCode === geo.properties.ISO_A2);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className="map-country cursor-pointer"
                        fill={getFillColor(countryData?.value)}
                        stroke="#fff"
                        strokeWidth={0.5}
                        onClick={() => countryData && handleCountryClick(countryData)}
                        onMouseEnter={() => {
                          if (countryData) setTooltipContent(
                            `${countryData?.flag} ${countryData?.country}\nValue: ${countryData?.volume}\nCategory: ${countryData?.category}\nClick for details`
                          );
                        }}
                        onMouseLeave={() => setTooltipContent("")}
                        style={{
                          default: { outline: "none" },
                          hover: countryData ? { fill: "#10B981", cursor: "pointer" } : { fill: "#E5E7EB" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {exportData?.map((country) => (
                <Marker key={country?.countryCode} coordinates={country?.coordinates || [0, 0]}>
                  <circle
                    r={6}
                    fill="#dc2626"
                    stroke="#fff"
                    strokeWidth={1}
                    className="map-country cursor-pointer animate-pulse"
                    onClick={() => handleCountryClick(country)}
                    onMouseEnter={() => setTooltipContent(
                      `${country?.flag} ${country?.country}\nValue: ${country?.volume}\nCategory: ${country?.category}\nClick for details`
                    )}
                    onMouseLeave={() => setTooltipContent("")}
                  />
                </Marker>
              ))}
            </ComposableMap>

            <Tooltip
              anchorSelect=".map-country"
              place="top"
              variant="dark"
              style={{ padding: "4px 8px", fontSize: "12px", borderRadius: "4px", whiteSpace: "pre-line" }}
            >
              {tooltipContent}
            </Tooltip>

            {/* Legend */}
            <div className="mt-3 flex flex-wrap items-center justify-center gap-3">
              {[
                { color: "#065f46", label: "$4M+" },
                { color: "#059669", label: "$2M-$4M" },
                { color: "#10b981", label: "$1M-$2M" },
                { color: "#34d399", label: "Under $1M" },
              ].map((l, idx) => (
                <div key={idx} className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }} />
                  <span className="text-xs">{l.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exportData?.sort((a, b) => (b?.value || 0) - (a?.value || 0)).map((c, idx) => (
            <Card 
              key={idx} 
              className="hover:shadow-lg transition transform hover:-translate-y-0.5 p-3 animate-fadeIn cursor-pointer"
              onClick={() => handleCountryClick(c)}
            >
              <CardHeader className="flex flex-col items-center gap-1">
                <span role="img" aria-label={`${c?.country} flag`} className="text-4xl">{c?.flag}</span>
                <CardTitle className="text-center text-base">{c?.country}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-700 flex flex-col gap-1 items-center text-sm">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>{c?.volume}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Box className="w-4 h-4 text-gray-500" />
                  <span>{c?.category}</span>
                </div>
                <Badge variant="outline" className="mt-2 text-xs">
                  Click for details
                </Badge>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryExports;