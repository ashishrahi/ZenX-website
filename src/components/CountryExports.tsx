// src/components/CountryExports.tsx
import React, { useState, useEffect } from "react";
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps";
import { Tooltip } from "react-tooltip";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { DollarSign, Box } from "lucide-react";
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

interface CountryExportsProps {
  exportData?: ExportData[];
}

const geoUrl = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

const CountryExports: React.FC<CountryExportsProps> = ({ exportData }) => {
  const [tooltipContent, setTooltipContent] = useState("");
  const [mapScale, setMapScale] = useState(140);

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

  const getFillColor = (value?: number) => {
    if (!value) return "#34d399";
    if (value > 4000000) return "#065f46";
    if (value > 2000000) return "#059669";
    if (value > 1000000) return "#10b981";
    return "#34d399";
  };

  if (!exportData?.length) {
    return (
      <div className="text-center p-10 text-gray-500">
        No export data available.
      </div>
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
                    const countryData = exportData?.find(c => c?.countryCode === geo.properties.ISO_A3);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        className="map-country animate-pulse-slow"
                        fill={getFillColor(countryData?.value)}
                        stroke="#fff"
                        strokeWidth={0.5}
                        onMouseEnter={() => {
                          if (countryData) setTooltipContent(
                            `${countryData?.flag} ${countryData?.country}\nValue: ${countryData?.volume}\nCategory: ${countryData?.category}`
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
                    r={5}
                    fill="#dc2626"
                    stroke="#fff"
                    strokeWidth={1}
                    className="map-country animate-ping-slow"
                    onMouseEnter={() => setTooltipContent(
                      `${country?.flag} ${country?.country}\nValue: ${country?.volume}\nCategory: ${country?.category}`
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
            <Card key={idx} className="hover:shadow-lg transition transform hover:-translate-y-0.5 p-3 animate-fadeIn">
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
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CountryExports;
