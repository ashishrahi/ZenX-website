// src/components/CountryExports.tsx
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { DollarSign, Box } from "lucide-react";
import ColoredTitle from "./ColoredTitle";

interface ExportData {
  country: string;
  countryCode: string;
  volume: string;
  value: number;
  category: string;
  flag: string;
  coordinates: [number, number];
}

// Mock API
const fetchCountryExports = async (): Promise<ExportData[]> => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  return [
    { country: "United States", countryCode: "USA", volume: "$5.2M", value: 5200000, category: "Innerwear", flag: "🇺🇸", coordinates: [-100, 40] },
    { country: "Germany", countryCode: "DEU", volume: "$3.8M", value: 3800000, category: "Innerwear", flag: "🇩🇪", coordinates: [10, 51] },
    { country: "Japan", countryCode: "JPN", volume: "$2.9M", value: 2900000, category: "Innerwear", flag: "🇯🇵", coordinates: [138, 36] },
    { country: "United Kingdom", countryCode: "GBR", volume: "$2.1M", value: 2100000, category: "Innerwear", flag: "🇬🇧", coordinates: [-2, 54] },
    { country: "Australia", countryCode: "AUS", volume: "$1.7M", value: 1700000, category: "Innerwear", flag: "🇦🇺", coordinates: [135, -25] },
    { country: "Brazil", countryCode: "BRA", volume: "$1.5M", value: 1500000, category: "Innerwear", flag: "🇧🇷", coordinates: [-53, -10] },
    { country: "India", countryCode: "IND", volume: "$1.2M", value: 1200000, category: "Innerwear", flag: "🇮🇳", coordinates: [78, 22] },
    { country: "China", countryCode: "CHN", volume: "$4.5M", value: 4500000, category: "Innerwear", flag: "🇨🇳", coordinates: [104, 35] },
  ];
};

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CountryExports: React.FC = () => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [exportData, setExportData] = useState<ExportData[]>([]);
  const [loading, setLoading] = useState(true);
  const [mapScale, setMapScale] = useState(140);

  // Load data
  useEffect(() => {
    const loadData = async () => {
      try {
        const data = await fetchCountryExports();
        setExportData(data);
      } catch (error) {
        console.error("Failed to load export data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  // Responsive map scale
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

  // Map fill color
  const getFillColor = (value: number) => {
    if (value > 4000000) return "#065f46";
    if (value > 2000000) return "#059669";
    if (value > 1000000) return "#10b981";
    return "#34d399";
  };

  if (loading) {
    return (
      <section className="max-w-7xl mx-auto p-4">
        <h1 className="text-2xl font-bold mb-6 text-center text-gray-800">
          Innerware Global Exports
        </h1>
        <div className="flex flex-col lg:flex-row gap-6">
          <Card className="flex-1 p-3">
            <CardHeader>
              <CardTitle className="text-lg">Export Map</CardTitle>
            </CardHeader>
            <CardContent>
              <Skeleton className="h-[300px] w-full" />
            </CardContent>
          </Card>
          <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
            {[...Array(8)].map((_, idx) => (
              <Card key={idx}>
                <CardHeader className="flex flex-col items-center gap-1">
                  <Skeleton className="h-10 w-10 rounded-full" />
                  <Skeleton className="h-5 w-20" />
                </CardHeader>
                <CardContent className="text-center">
                  <Skeleton className="h-4 w-24 mb-1" />
                  <Skeleton className="h-4 w-20" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

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
                    const countryData = exportData.find(c => c.countryCode === geo.properties.ISO_A3);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className="map-country animate-pulse-slow"
                        fill={countryData ? getFillColor(countryData.value) : "#E5E7EB"}
                        stroke="#fff"
                        strokeWidth={0.5}
                        onMouseEnter={() => {
                          if (countryData) {
                            setTooltipContent(
                              `${countryData.flag} ${countryData.country}\nValue: ${countryData.volume}\nCategory: ${countryData.category}`
                            );
                          }
                        }}
                        onMouseLeave={() => setTooltipContent("")}
                        style={{
                          default: { outline: "none" },
                          hover: countryData
                            ? { fill: "#10B981", cursor: "pointer" }
                            : { fill: "#E5E7EB" },
                          pressed: { outline: "none" },
                        }}
                      />
                    );
                  })
                }
              </Geographies>

              {exportData.map((country) => (
                <Marker key={country.countryCode} coordinates={country.coordinates}>
                  <circle
                    r={5}
                    fill="#dc2626"
                    stroke="#fff"
                    strokeWidth={1}
                    className="map-country animate-ping-slow"
                    onMouseEnter={() => {
                      setTooltipContent(
                        `${country.flag} ${country.country}\nValue: ${country.volume}\nCategory: ${country.category}`
                      );
                    }}
                    onMouseLeave={() => setTooltipContent("")}
                  />
                </Marker>
              ))}
            </ComposableMap>

            {/* Tooltip */}
            <Tooltip
              anchorSelect=".map-country"
              multiline
              place="top"
              variant="dark"
              style={{ padding: "4px 8px", fontSize: "12px", borderRadius: "4px" }}
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
                  <div className="w-3 h-3 rounded-sm" style={{ backgroundColor: l.color }}></div>
                  <span className="text-xs">{l.label}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Export Cards */}
        <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-4">
          {exportData.sort((a,b) => b.value - a.value).map((c, idx) => (
            <Card key={idx} className="hover:shadow-lg transition transform hover:-translate-y-0.5 p-3 animate-fadeIn">
              <CardHeader className="flex flex-col items-center gap-1">
                <span role="img" aria-label={`${c.country} flag`} className="text-4xl">
                  {c.flag}
                </span>
                <CardTitle className="text-center text-base">{c.country}</CardTitle>
              </CardHeader>
              <CardContent className="text-center text-gray-700 flex flex-col gap-1 items-center text-sm">
                <div className="flex items-center gap-1">
                  <DollarSign className="w-4 h-4 text-green-600" />
                  <span>{c.volume}</span>
                </div>
                <div className="flex items-center gap-1">
                  <Box className="w-4 h-4 text-gray-500" />
                  <span>{c.category}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryExports;
